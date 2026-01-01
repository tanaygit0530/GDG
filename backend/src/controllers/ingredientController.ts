import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredientService';

export const getIngredientDetails = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.params;
    
    // Extract context from query parameters
    const context = {
      ageGroup: req.query.ageGroup as 'child' | 'adult' | 'elderly' | undefined,
      healthConditions: req.query.healthConditions as string[] | undefined,
      consumptionFrequency: req.query.consumptionFrequency as 'daily' | 'weekly' | 'occasional' | undefined,
    };
    
    const ingredient = await IngredientService.getIngredientByName(name, context);
    
    if (!ingredient) {
      res.status(404).json({ message: 'Ingredient not found' });
      return;
    }
    
    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredient details', error: (error as Error).message });
  }
};