import express, { Application } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import ingredientRoutes from './routes/ingredientRoutes';
import scanRoutes from './routes/scanRoutes';
import connectDB from './config/db';
import { errorHandler } from './middleware/errorHandler';
import { upload } from './middleware/upload';

dotenv.config();
connectDB();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_req, res) => {
  res.send("API running (TypeScript)");
});

app.use('/api/ingredients', ingredientRoutes);
app.use('/api/scan', scanRoutes);

// Error handler
app.use(errorHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});