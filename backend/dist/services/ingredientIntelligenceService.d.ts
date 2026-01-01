import { Ingredient } from '../models/Ingredient';
export declare class IngredientIntelligenceEngine {
    static calculateSafetyScore(ingredient: Ingredient, context?: {
        ageGroup?: 'child' | 'adult' | 'elderly';
        healthConditions?: string[];
        consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
    }): {
        score: number;
        explanation: string;
    };
    static normalizeIngredientName(name: string): string[];
    static getEducationalContext(ingredient: Ingredient, context?: {
        ageGroup?: 'child' | 'adult' | 'elderly';
        healthConditions?: string[];
    }): string;
}
//# sourceMappingURL=ingredientIntelligenceService.d.ts.map