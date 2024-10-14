import express from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import rideRoutes from './route/ride';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Set up Neon PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Neon SSL connections
  }
});

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Ride Hailing App Backend');
});
app.use('/api/rides', rideRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
