"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIngredientDetails = void 0;
const ingredientService_1 = require("../services/ingredientService");
const getIngredientDetails = async (req, res) => {
    try {
        const { name } = req.params;
        const context = {
            ageGroup: req.query.ageGroup,
            healthConditions: req.query.healthConditions,
            consumptionFrequency: req.query.consumptionFrequency,
        };
        const ingredient = await ingredientService_1.IngredientService.getIngredientByName(name, context);
        if (!ingredient) {
            res.status(404).json({ message: 'Ingredient not found' });
            return;
        }
        res.json(ingredient);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching ingredient details', error: error.message });
    }
};
exports.getIngredientDetails = getIngredientDetails;
//# sourceMappingURL=ingredientController.js.map