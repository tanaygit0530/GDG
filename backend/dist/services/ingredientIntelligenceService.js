"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientIntelligenceEngine = void 0;
const ingredientDatabase_1 = require("../data/ingredientDatabase");
class IngredientIntelligenceEngine {
    static calculateSafetyScore(ingredient, context) {
        let score = ingredient.safetyScore;
        let explanation = ingredient.safetyExplanation;
        if (context?.ageGroup === 'child' && ingredient.ageConsiderations?.children) {
            score = Math.max(1, score - 2);
            explanation += ` Note for children: ${ingredient.ageConsiderations.children}`;
        }
        if (context?.healthConditions && ingredient.healthConditions) {
            const conditionAdjustments = [];
            if (context.healthConditions.includes('diabetes') && ingredient.healthConditions.diabetes) {
                conditionAdjustments.push(ingredient.healthConditions.diabetes);
                if (context.healthConditions.includes('diabetes')) {
                    score = Math.max(1, score - 1);
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
        if (context?.consumptionFrequency === 'daily' && score > 5) {
            score = Math.max(1, score - 1);
            explanation += ' Note: While generally safe, frequent daily consumption may not be ideal for optimal health.';
        }
        else if (context?.consumptionFrequency === 'occasional' && score < 8) {
            score = Math.min(10, score + 1);
            explanation += ' Note: Occasional consumption as part of a balanced diet is generally not concerning.';
        }
        score = Math.max(1, Math.min(10, score));
        return { score: Math.round(score), explanation };
    }
    static normalizeIngredientName(name) {
        const normalizedName = name.toLowerCase().trim();
        const matches = [];
        for (const ingredient of ingredientDatabase_1.ingredientDatabase) {
            if (ingredient.name.toLowerCase() === normalizedName ||
                ingredient.scientificName?.toLowerCase() === normalizedName ||
                ingredient.aliases.some(alias => alias.toLowerCase() === normalizedName) ||
                ingredient.eNumbers.some(eNum => eNum.toLowerCase() === normalizedName)) {
                matches.push(ingredient.name);
            }
        }
        if (matches.length === 0) {
            for (const ingredient of ingredientDatabase_1.ingredientDatabase) {
                if (ingredient.name.toLowerCase().includes(normalizedName) ||
                    normalizedName.includes(ingredient.name.toLowerCase()) ||
                    ingredient.aliases.some(alias => alias.toLowerCase().includes(normalizedName) ||
                        normalizedName.includes(alias.toLowerCase()))) {
                    matches.push(ingredient.name);
                }
            }
        }
        return Array.from(new Set(matches));
    }
    static getEducationalContext(ingredient, context) {
        let educationalContext = `About ${ingredient.name}: `;
        educationalContext += `This ingredient is ${ingredient.origin.toLowerCase()}. `;
        if (ingredient.purpose.length > 0) {
            educationalContext += `It is commonly used as: ${ingredient.purpose.join(', ')}. `;
        }
        const aliases = [...ingredient.aliases, ...ingredient.eNumbers].filter(alias => alias.toLowerCase() !== ingredient.name.toLowerCase());
        if (aliases.length > 0) {
            educationalContext += `It may also be listed as: ${aliases.join(', ')}. `;
        }
        if (context?.ageGroup === 'child' && ingredient.ageConsiderations?.children) {
            educationalContext += `For children: ${ingredient.ageConsiderations.children} `;
        }
        if (context?.healthConditions && ingredient.healthConditions) {
            const conditions = [];
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
exports.IngredientIntelligenceEngine = IngredientIntelligenceEngine;
//# sourceMappingURL=ingredientIntelligenceService.js.map