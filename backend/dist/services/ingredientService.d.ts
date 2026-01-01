import { Ingredient } from '../models/Ingredient';
export declare class IngredientService {
    static getIngredientByName(name: string, context?: {
        ageGroup?: 'child' | 'adult' | 'elderly';
        healthConditions?: string[];
        consumptionFrequency?: 'daily' | 'weekly' | 'occasional';
    }): Promise<Ingredient | null>;
}
//# sourceMappingURL=ingredientService.d.ts.map