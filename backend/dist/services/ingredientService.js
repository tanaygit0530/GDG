"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientService = void 0;
const ingredientDatabase_1 = require("../data/ingredientDatabase");
const ingredientIntelligenceService_1 = require("./ingredientIntelligenceService");
class IngredientService {
    static async getIngredientByName(name, context) {
        const normalizedName = name.toLowerCase().trim();
        for (const ingredient of ingredientDatabase_1.ingredientDatabase) {
            if (ingredient.name.toLowerCase() === normalizedName ||
                ingredient.scientificName?.toLowerCase() === normalizedName ||
                ingredient.aliases.some((alias) => alias.toLowerCase() === normalizedName) ||
                ingredient.eNumbers.some((eNum) => eNum.toLowerCase() === normalizedName)) {
                if (context) {
                    const enhancedIngredient = { ...ingredient };
                    const calculatedScore = ingredientIntelligenceService_1.IngredientIntelligenceEngine.calculateSafetyScore(ingredient, context);
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
exports.IngredientService = IngredientService;
//# sourceMappingURL=ingredientService.js.map