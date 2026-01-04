"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImageForIngredients = void 0;
const ingredientService_1 = require("../services/ingredientService");
const ocrService_1 = require("../services/ocrService");
const processImageForIngredients = async (req, res) => {
    let fileProcessed = false;
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No image file provided' });
            return;
        }
        const ingredientText = await (0, ocrService_1.analyzeIngredientsFromText)(req.file.path);
        const ingredients = await Promise.all(ingredientText.map(async (ingredientName) => {
            const ingredient = await ingredientService_1.IngredientService.getIngredientByName(ingredientName);
            return ingredient;
        }));
        const foundIngredients = ingredients.filter((ingredient) => ingredient !== null);
        try {
            await (0, ocrService_1.deleteTempFile)(req.file.path);
            console.log(`Temporary file ${req.file.path} deleted successfully`);
            fileProcessed = true;
        }
        catch (error) {
            console.error('Error deleting temporary file:', error);
        }
        res.json({
            originalText: ingredientText,
            ingredients: foundIngredients
        });
        return;
    }
    catch (error) {
        if (req.file && !fileProcessed) {
            try {
                await (0, ocrService_1.deleteTempFile)(req.file.path);
                console.log(`Temporary file ${req.file.path} deleted after error`);
            }
            catch (deleteError) {
                console.error('Error deleting temporary file after error:', deleteError);
            }
        }
        res.status(500).json({ message: 'Error processing image for ingredients', error: error.message });
    }
};
exports.processImageForIngredients = processImageForIngredients;
//# sourceMappingURL=scanController.js.map