import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ingredientRoutes from './routes/ingredientRoutes';
import scanRoutes from './routes/scanRoutes';
import { errorHandler } from './middleware/errorHandler';
import { upload } from './middleware/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/scan', scanRoutes);

// Error handler
app.use(errorHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});