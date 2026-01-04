import { IIngredient } from '../models/Ingredient';
export declare class IngredientIntelligenceEngine {
    static calculateSafetyScore(ingredient: IIngredient, context?: {
        ageGroup?: 'child' | 'adult' | 'elderly';
        healthConditions?: string[];
        consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
    }): {
        score: number;
        explanation: string;
    };
    static normalizeIngredientName(name: string): Promise<string[]>;
    static getEducationalContext(ingredient: IIngredient, context?: {
        ageGroup?: 'child' | 'adult' | 'elderly';
        healthConditions?: string[];
    }): string;
}
//# sourceMappingURL=ingredientIntelligenceService.d.ts.map