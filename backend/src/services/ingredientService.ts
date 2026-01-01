import { Ingredient } from '../models/Ingredient';
import { ingredientDatabase } from '../data/ingredientDatabase';
import { IngredientIntelligenceEngine } from './ingredientIntelligenceService';

export class IngredientService {
  static async getIngredientByName(name: string, context?: {
    ageGroup?: 'child' | 'adult' | 'elderly';
    healthConditions?: string[];
    consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
  }): Promise<Ingredient | null> {
    // Normalize the input name for comparison
    const normalizedName = name.toLowerCase().trim();
    
    // Search in the database
    for (const ingredient of ingredientDatabase) {
      // Check if the name matches directly or any of its aliases
      if (
        ingredient.name.toLowerCase() === normalizedName ||
        ingredient.scientificName?.toLowerCase() === normalizedName ||
        ingredient.aliases.some((alias: string) => alias.toLowerCase() === normalizedName) ||
        ingredient.eNumbers.some((eNum: string) => eNum.toLowerCase() === normalizedName)
      ) {
        // If context is provided, return enhanced ingredient with calculated scores
        if (context) {
          const enhancedIngredient = { ...ingredient };
          const calculatedScore = IngredientIntelligenceEngine.calculateSafetyScore(ingredient, context);
          
          // Update the safety score and explanation based on context
          enhancedIngredient.safetyScore = calculatedScore.score;
          enhancedIngredient.safetyExplanation = calculatedScore.explanation;
          
          return enhancedIngredient;
        }
        
        return ingredient;
      }
    }
    
    return null;
  }
}