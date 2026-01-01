import { Router } from 'express';
import { getIngredientDetails } from '../controllers/ingredientController';

const router = Router();

router.get('/:name', getIngredientDetails);

export default router;