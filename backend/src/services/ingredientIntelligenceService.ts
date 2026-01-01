import { Ingredient } from '../models/Ingredient';
import { ingredientDatabase } from '../data/ingredientDatabase';

export class IngredientIntelligenceEngine {
  /**
   * Calculates a safety score for an ingredient based on multiple factors
   * @param ingredient The ingredient to score
   * @param context Optional context for personalized scoring (age, health conditions)
   * @returns A safety score between 1-10 with explanation
   */
  static calculateSafetyScore(ingredient: Ingredient, context?: {
    ageGroup?: 'child' | 'adult' | 'elderly';
    healthConditions?: string[];
    consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
  }): { score: number; explanation: string } {
    // Start with the base score from the database
    let score = ingredient.safetyScore;
    let explanation = ingredient.safetyExplanation;
    
    // Adjust based on age group if specified
    if (context?.ageGroup === 'child' && ingredient.ageConsiderations?.children) {
      // Children generally get lower scores for ingredients that are not ideal for them
      score = Math.max(1, score - 2); // Reduce score by 2 for children (minimum 1)
      explanation += ` Note for children: ${ingredient.ageConsiderations.children}`;
    }
    
    // Adjust based on health conditions
    if (context?.healthConditions && ingredient.healthConditions) {
      const conditionAdjustments: string[] = [];
      
      if (context.healthConditions.includes('diabetes') && ingredient.healthConditions.diabetes) {
        conditionAdjustments.push(ingredient.healthConditions.diabetes);
        if (context.healthConditions.includes('diabetes')) {
          score = Math.max(1, score - 1); // Slightly reduce score for diabetes-related concerns
        }
      }
      
      if (context.healthConditions.includes('blood-pressure') && ingredient.healthConditions.bloodPressure) {
        conditionAdjustments.push(ingredient.healthConditions.bloodPressure);
        if (context.healthConditions.includes('blood-pressure')) {
          score = Math.max(1, score - 1);
        }
      }
      
      if (context.healthConditions.includes('digestive') && ingredient.healthConditions.digestive) {
        conditionAdjustments.push(ingredient.healthConditions.digestive);
        if (context.healthConditions.includes('digestive')) {
          score = Math.max(1, score - 1);
        }
      }
      
      if (conditionAdjustments.length > 0) {
        explanation += ` Health considerations: ${conditionAdjustments.join(' ')}`;
      }
    }
    
    // Adjust based on consumption frequency
    if (context?.consumptionFrequency === 'daily' && score > 5) {
      // For daily consumption, even relatively safe ingredients might have concerns
      score = Math.max(1, score - 1);
      explanation += ' Note: While generally safe, frequent daily consumption may not be ideal for optimal health.';
    } else if (context?.consumptionFrequency === 'occasional' && score < 8) {
      // For occasional consumption, slightly improve scores of moderate ingredients
      score = Math.min(10, score + 1);
      explanation += ' Note: Occasional consumption as part of a balanced diet is generally not concerning.';
    }
    
    // Ensure score is within bounds
    score = Math.max(1, Math.min(10, score));
    
    return { score: Math.round(score), explanation };
  }

  /**
   * Normalizes ingredient names to find potential aliases
   * @param name The ingredient name to normalize
   * @returns Array of potential matching names
   */
  static normalizeIngredientName(name: string): string[] {
    const normalizedName = name.toLowerCase().trim();
    const matches: string[] = [];

    // Look for exact matches and aliases in the database
    for (const ingredient of ingredientDatabase) {
      if (
        ingredient.name.toLowerCase() === normalizedName ||
        ingredient.scientificName?.toLowerCase() === normalizedName ||
        ingredient.aliases.some(alias => alias.toLowerCase() === normalizedName) ||
        ingredient.eNumbers.some(eNum => eNum.toLowerCase() === normalizedName)
      ) {
        matches.push(ingredient.name);
      }
    }

    // If no direct matches found, try partial matching
    if (matches.length === 0) {
      for (const ingredient of ingredientDatabase) {
        if (
          ingredient.name.toLowerCase().includes(normalizedName) ||
          normalizedName.includes(ingredient.name.toLowerCase()) ||
          ingredient.aliases.some(alias => 
            alias.toLowerCase().includes(normalizedName) || 
            normalizedName.includes(alias.toLowerCase())
          )
        ) {
          matches.push(ingredient.name);
        }
      }
    }

    // Remove duplicates
    return Array.from(new Set(matches));
  }

  /**
   * Provides educational context about an ingredient
   * @param ingredient The ingredient to get context for
   * @param context Optional user context
   * @returns Educational information about the ingredient
   */
  static getEducationalContext(ingredient: Ingredient, context?: {
    ageGroup?: 'child' | 'adult' | 'elderly';
    healthConditions?: string[];
  }): string {
    let educationalContext = `About ${ingredient.name}: `;
    
    // Add origin information
    educationalContext += `This ingredient is ${ingredient.origin.toLowerCase()}. `;
    
    // Add purpose information
    if (ingredient.purpose.length > 0) {
      educationalContext += `It is commonly used as: ${ingredient.purpose.join(', ')}. `;
    }
    
    // Add alias information
    const aliases = [...ingredient.aliases, ...ingredient.eNumbers].filter(alias => alias.toLowerCase() !== ingredient.name.toLowerCase());
    if (aliases.length > 0) {
      educationalContext += `It may also be listed as: ${aliases.join(', ')}. `;
    }
    
    // Add age-specific considerations
    if (context?.ageGroup === 'child' && ingredient.ageConsiderations?.children) {
      educationalContext += `For children: ${ingredient.ageConsiderations.children} `;
    }
    
    // Add health condition considerations
    if (context?.healthConditions && ingredient.healthConditions) {
      const conditions: string[] = [];
      
      if (context.healthConditions.includes('diabetes') && ingredient.healthConditions.diabetes) {
        conditions.push(`Individuals managing blood sugar: ${ingredient.healthConditions.diabetes}`);
      }
      
      if (context.healthConditions.includes('blood-pressure') && ingredient.healthConditions.bloodPressure) {
        conditions.push(`Individuals managing blood pressure: ${ingredient.healthConditions.bloodPressure}`);
      }
      
      if (context.healthConditions.includes('digestive') && ingredient.healthConditions.digestive) {
        conditions.push(`Individuals with digestive sensitivity: ${ingredient.healthConditions.digestive}`);
      }
      
      if (conditions.length > 0) {
        educationalContext += `Health considerations: ${conditions.join(' ')}`;
      }
    }
    
    return educationalContext;
  }
}