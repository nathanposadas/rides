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
        { status: 400, headers: { "Content-Type": "application/json" } }
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
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Respond with the inserted user data
    return new Response(JSON.stringify({ data: response[0] }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);

    // Return error with proper headers
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
