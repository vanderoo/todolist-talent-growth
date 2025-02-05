import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOSTNAME = process.env.HOSTNAME || "localhost";

connectDB();

app.use(express.json());
app.use('/items', itemRoutes);
app.use('/auth', authRoutes);
app.use(errorMiddleware);

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});