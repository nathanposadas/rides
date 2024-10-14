import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Create a new ride booking
router.post('/book', async (req, res) => {
  const { passenger_id, driver_id, pickup_location, dropoff_location, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO rides (passenger_id, driver_id, pickup_location, dropoff_location, status)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [passenger_id, driver_id, pickup_location, dropoff_location, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error booking ride' });
  }
});

export default router;
