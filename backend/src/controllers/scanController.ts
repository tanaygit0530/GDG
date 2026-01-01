import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredientService';
import { analyzeIngredientsFromText, deleteTempFile } from '../services/ocrService';

export const processImageForIngredients = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No image file provided' });
      return;
    }

    // Process the image through OCR service
    const ingredientText = await analyzeIngredientsFromText(req.file.path);
    
    // Find matching ingredients in our database
    const ingredients = await Promise.all(
      ingredientText.map(async (ingredientName: string) => {
        const ingredient = await IngredientService.getIngredientByName(ingredientName);
        return ingredient;
      })
    );

    // Filter out null results
    const foundIngredients = ingredients.filter((ingredient): ingredient is NonNullable<typeof ingredient> => ingredient !== null);

    // Delete the temporary file after processing
    try {
      await deleteTempFile(req.file.path);
      console.log(`Temporary file ${req.file.path} deleted successfully`);
    } catch (error) {
      console.error('Error deleting temporary file:', error);
    }

    res.json({
      originalText: ingredientText,
      ingredients: foundIngredients
    });
    return;
  } catch (error) {
    // Delete the temporary file even if processing fails
    if (req.file) {
      try {
        await deleteTempFile(req.file.path);
        console.log(`Temporary file ${req.file.path} deleted after error`);
      } catch (deleteError) {
        console.error('Error deleting temporary file after error:', deleteError);
      }
    }
    
    res.status(500).json({ message: 'Error processing image for ingredients', error: (error as Error).message });
  }
};