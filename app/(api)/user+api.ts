import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId, pin } = await request.json();

    // Check for missing fields
    if (!name || !email || !clerkId || !pin) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Insert user data into the Neon DB
    const response = await sql`
      INSERT INTO users (
        name, 
        email, 
        clerk_id,
        pin
      ) 
      VALUES (
        ${name}, 
        ${email},
        ${clerkId},
        ${pin}
      ) RETURNING *;`; // Return inserted record

    // Respond with the inserted user data
    return new Response(JSON.stringify({ data: response }), {
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
