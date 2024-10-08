import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    // Initialize the Neon database connection
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // Parse the incoming request body as JSON
    const { name, email, clerkId, pin, role } = await request.json();

    // Log incoming request
    console.log("Incoming request body:", { name, email, clerkId, pin, role });

    // Check for missing fields
    if (!name || !email || !clerkId || !pin || !role) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",  // Allow all origins
            "Access-Control-Allow-Methods": "POST",  // Allow POST requests
          },
        }
      );
    }

    // Insert user data into the Neon DB
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
      ) RETURNING *;`; // Return the inserted record

    // Log the response from the database
    console.log("Database response:", response);

    // Check if the response is valid
    if (!response || response.length === 0) {
      return new Response(
        JSON.stringify({ error: "User could not be created." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",  // Allow all origins
            "Access-Control-Allow-Methods": "POST",  // Allow POST requests
          },
        }
      );
    }

    // Respond with the inserted user data
    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",  // Allow all origins
        "Access-Control-Allow-Methods": "POST",  // Allow POST requests
      },
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    // Type assertion to access message property
    if (error instanceof Error) {
      // Check if the error is related to the database connection
      if (error.message.includes('failed to connect')) {
        return new Response(
          JSON.stringify({ error: "Database connection error" }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",  // Allow all origins
              "Access-Control-Allow-Methods": "POST",  // Allow POST requests
            },
          }
        );
      }
    }

    // Return a general internal server error response
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",  // Allow all origins
          "Access-Control-Allow-Methods": "POST",  // Allow POST requests
        },
      }
    );
  }
}
