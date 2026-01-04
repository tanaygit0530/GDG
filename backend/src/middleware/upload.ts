import * as path from 'path';
import { deleteTempFile } from '../services/ocrService';

const multer = require('multer');

// Configure multer for temporary file storage
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
    // Create a temporary directory for uploads
    const tempPath = path.join(__dirname, '../../temp');
    // Ensure the temp directory exists
    const fs = require('fs');
    if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }
    cb(null, tempPath);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
    // Generate a unique filename to prevent conflicts
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ingredient-scan-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow image files
const fileFilter = (req: any, file: any, cb: any) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer upload
export const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Middleware to automatically delete temporary files after processing
export const autoDeleteTempFile = async (req: any, res: any, next: any) => {
  // Process the request
  next();
  
  // After the response is sent, delete the temporary file
  res.on('finish', async () => {
    if (req.file) {
      try {
        await deleteTempFile(req.file.path);
        console.log(`Temporary file ${req.file.path} deleted successfully`);
      } catch (error) {
        console.error('Error deleting temporary file:', error);
      }
    }
  });
  
  // Handle errors during request processing
  res.on('error', async () => {
    if (req.file) {
      try {
        await deleteTempFile(req.file.path);
        console.log(`Temporary file ${req.file.path} deleted after error`);
      } catch (error) {
        console.error('Error deleting temporary file after error:', error);
      }
    }
  });
};