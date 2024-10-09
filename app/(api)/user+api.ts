import { neon } from "@neondatabase/serverless";

// Function to create a user
export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId, pin, role } = await request.json();

    console.log("Incoming request body:", { name, email, clerkId, pin, role });

    if (!name || !email || !clerkId || !pin || !role) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
      });
    }

    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id,
        pin,
        role
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId},
        ${pin},
        ${role}
      ) RETURNING *;`;

    console.log("Database response:", response);

    if (!response || response.length === 0) {
      return new Response(JSON.stringify({ error: "User could not be created." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
        },
      });
    }

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      if (error.message.includes('failed to connect')) {
        return new Response(JSON.stringify({ error: "Database connection error" }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
          },
        });
      }
    }

    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
      },
    });
  }
}

// Function to get user details by clerk ID
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const clerkId = url.searchParams.get("clerkId"); // Get the clerkId from query parameters

    if (!clerkId) {
      return new Response(JSON.stringify({ error: "Missing clerkId" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      });
    }

    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`
      SELECT name, email, clerk_id, pin, role 
      FROM users 
      WHERE clerk_id = ${clerkId};`;

    if (!response || response.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
        },
      });
    }

    return new Response(JSON.stringify({ data: response[0] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  }
}
