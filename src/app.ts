import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

connectDB();

app.use(express.json());

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});