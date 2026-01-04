"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientService = void 0;
const Ingredient_1 = __importDefault(require("../models/Ingredient"));
const ingredientIntelligenceService_1 = require("./ingredientIntelligenceService");
class IngredientService {
    static async getIngredientByName(name, context) {
        try {
            const normalizedName = name.toLowerCase().trim();
            const ingredient = await Ingredient_1.default.findOne({
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
            if (context) {
                const calculatedScore = ingredientIntelligenceService_1.IngredientIntelligenceEngine.calculateSafetyScore(ingredient.toObject(), context);
                ingredient.safetyScore = calculatedScore.score;
                ingredient.safetyExplanation = calculatedScore.explanation;
            }
            return ingredient;
        }
        catch (error) {
            console.error('Error fetching ingredient from database:', error);
            throw error;
        }
    }
}
exports.IngredientService = IngredientService;
//# sourceMappingURL=ingredientService.js.map