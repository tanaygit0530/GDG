import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredientService';
import { analyzeIngredientsFromText, deleteTempFile } from '../services/ocrService';

export const processImageForIngredients = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate that file exists
    if (!req.file) {
      console.error('No image file provided to OCR endpoint');
      res.status(400).json({ 
        success: false,
        message: 'No image file provided',
        error: 'Missing file in request' 
      });
      return;
    }

    console.log(`Processing image file: ${req.file.path}`);
    
    // Process the image through OCR service with error handling
    let ingredientText: string[] = [];
    try {
      ingredientText = await analyzeIngredientsFromText(req.file.path);
      console.log(`OCR analysis completed, found ${ingredientText.length} ingredients`);
    } catch (ocrError) {
      console.error('OCR service failed:', ocrError);
      
      // Return a graceful response even if OCR fails
      res.status(500).json({ 
        success: false,
        message: 'OCR analysis failed',
        error: (ocrError as Error).message || 'OCR processing error',
        originalText: [],
        ingredients: []
      });
      
      // Attempt to delete the temporary file
      try {
        await deleteTempFile(req.file.path);
        console.log(`Temporary file ${req.file.path} deleted after OCR error`);
      } catch (deleteError) {
        console.error('Error deleting temporary file after OCR error:', deleteError);
      }
      return;
    }
    
    // Find matching ingredients in our database
    let foundIngredients: any[] = [];
    try {
      const ingredients = await Promise.all(
        ingredientText.map(async (ingredientName: string) => {
          try {
            const ingredient = await IngredientService.getIngredientByName(ingredientName);
            return ingredient;
          } catch (dbError) {
            console.error(`Database error when looking up ingredient ${ingredientName}:`, dbError);
            return null;
          }
        })
      );
      
      // Filter out null results
      foundIngredients = ingredients.filter((ingredient): ingredient is NonNullable<typeof ingredient> => 
        ingredient !== null
      );
      
      console.log(`Found ${foundIngredients.length} matching ingredients in database`);
    } catch (dbError) {
      console.error('Database lookup error:', dbError);
      // Continue with empty array instead of failing completely
      foundIngredients = [];
    }

    // Delete the temporary file after processing
    try {
      await deleteTempFile(req.file.path);
      console.log(`Temporary file ${req.file.path} deleted successfully`);
    } catch (error) {
      console.error('Error deleting temporary file:', error);
    }

    // Always return a JSON response
    res.json({
      success: true,
      originalText: ingredientText,
      ingredients: foundIngredients,
      message: foundIngredients.length > 0 
        ? `${foundIngredients.length} ingredients successfully analyzed` 
        : 'No ingredients identified in the image'
    });
    
  } catch (error) {
    console.error('Unexpected error in processImageForIngredients:', error);
    
    // Delete the temporary file even if processing fails
    if (req.file) {
      try {
        await deleteTempFile(req.file.path);
        console.log(`Temporary file ${req.file.path} deleted after unexpected error`);
      } catch (deleteError) {
        console.error('Error deleting temporary file after unexpected error:', deleteError);
      }
    }
    
    // Always return a JSON response, never let the server crash
    res.status(500).json({ 
      success: false,
      message: 'Internal server error during image processing',
      error: (error as Error).message || 'Unknown error occurred',
      originalText: [],
      ingredients: []
    });
  }
};