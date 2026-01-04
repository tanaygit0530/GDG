import Ingredient, { IIngredient } from '../models/Ingredient';
import { IngredientIntelligenceEngine } from './ingredientIntelligenceService';

export class IngredientService {
  static async getIngredientByName(name: string, context?: {
    ageGroup?: 'child' | 'adult' | 'elderly';
    healthConditions?: string[];
    consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
  }): Promise<IIngredient | null> {
    try {
      // Normalize the input name for comparison
      const normalizedName = name.toLowerCase().trim();
      
      // Search in the MongoDB database using both old and new field names
      const ingredient = await Ingredient.findOne({
        $or: [
          { name: { $regex: new RegExp(normalizedName, 'i') } },
          { primary_name: { $regex: new RegExp(normalizedName, 'i') } },
          { scientificName: { $regex: new RegExp(normalizedName, 'i') } },
          { aliases: { $in: [new RegExp(normalizedName, 'i')] } },
          { eNumbers: { $in: [new RegExp(normalizedName, 'i')] } }
        ]
      });
      
      if (!ingredient) {
        return null;
      }
      
      // If context is provided, return enhanced ingredient with calculated scores
      if (context) {
        const calculatedScore = IngredientIntelligenceEngine.calculateSafetyScore(ingredient.toObject(), context);
        
        // Update the safety score and explanation based on context
        ingredient.safetyScore = calculatedScore.score;
        ingredient.safetyExplanation = calculatedScore.explanation;
      }
      
      return ingredient;
    } catch (error) {
      console.error('Error fetching ingredient from database:', error);
      throw error;
    }
  }
}