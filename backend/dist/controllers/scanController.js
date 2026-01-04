"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processImageForIngredients = void 0;
const ingredientService_1 = require("../services/ingredientService");
const ocrService_1 = require("../services/ocrService");
const processImageForIngredients = async (req, res) => {
    try {
        if (!req.file) {
            console.error('No image file provided to OCR endpoint');
            res.status(400).json({
                success: false,
                message: 'No image file provided',
                error: 'Missing file in request'
            });
            return;
        }
        console.log(`Processing image file: ${req.file.path}`);
        let ingredientText = [];
        try {
            ingredientText = await (0, ocrService_1.analyzeIngredientsFromText)(req.file.path);
            console.log(`OCR analysis completed, found ${ingredientText.length} ingredients`);
        }
        catch (ocrError) {
            console.error('OCR service failed:', ocrError);
            res.status(500).json({
                success: false,
                message: 'OCR analysis failed',
                error: ocrError.message || 'OCR processing error',
                originalText: [],
                ingredients: []
            });
            try {
                await (0, ocrService_1.deleteTempFile)(req.file.path);
                console.log(`Temporary file ${req.file.path} deleted after OCR error`);
            }
            catch (deleteError) {
                console.error('Error deleting temporary file after OCR error:', deleteError);
            }
            return;
        }
        let foundIngredients = [];
        try {
            const ingredients = await Promise.all(ingredientText.map(async (ingredientName) => {
                try {
                    const ingredient = await ingredientService_1.IngredientService.getIngredientByName(ingredientName);
                    return ingredient;
                }
                catch (dbError) {
                    console.error(`Database error when looking up ingredient ${ingredientName}:`, dbError);
                    return null;
                }
            }));
            foundIngredients = ingredients.filter((ingredient) => ingredient !== null);
            console.log(`Found ${foundIngredients.length} matching ingredients in database`);
        }
        catch (dbError) {
            console.error('Database lookup error:', dbError);
            foundIngredients = [];
        }
        try {
            await (0, ocrService_1.deleteTempFile)(req.file.path);
            console.log(`Temporary file ${req.file.path} deleted successfully`);
        }
        catch (error) {
            console.error('Error deleting temporary file:', error);
        }
        res.json({
            success: true,
            originalText: ingredientText,
            ingredients: foundIngredients,
            message: foundIngredients.length > 0
                ? `${foundIngredients.length} ingredients successfully analyzed`
                : 'No ingredients identified in the image'
        });
    }
    catch (error) {
        console.error('Unexpected error in processImageForIngredients:', error);
        if (req.file) {
            try {
                await (0, ocrService_1.deleteTempFile)(req.file.path);
                console.log(`Temporary file ${req.file.path} deleted after unexpected error`);
            }
            catch (deleteError) {
                console.error('Error deleting temporary file after unexpected error:', deleteError);
            }
        }
        res.status(500).json({
            success: false,
            message: 'Internal server error during image processing',
            error: error.message || 'Unknown error occurred',
            originalText: [],
            ingredients: []
        });
    }
};
exports.processImageForIngredients = processImageForIngredients;
//# sourceMappingURL=scanController.js.map