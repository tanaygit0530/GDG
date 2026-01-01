import { Router } from 'express';
import { processImageForIngredients } from '../controllers/scanController';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/ocr', upload.single('image'), processImageForIngredients);

export default router;