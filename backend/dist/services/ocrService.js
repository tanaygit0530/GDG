"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTempFile = exports.analyzeIngredientsFromText = void 0;
const generative_ai_1 = require("@google/generative-ai");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
const analyzeIngredientsFromText = async (imagePath) => {
    try {
        const imageBuffer = fs.readFileSync(imagePath);
        const imageBase64 = imageBuffer.toString('base64');
        const prompt = `Analyze this food product label image and extract the ingredient list. 
    Return only the ingredient names as a comma-separated list. 
    Normalize the ingredient names to their common forms (e.g., "E102" should become "Tartrazine", "Aspartame" instead of "E951"). 
    Focus only on the ingredients themselves, not other text on the label.`;
        const image = {
            inlineData: {
                data: imageBase64,
                mimeType: getMimeType(imagePath)
            }
        };
        const result = await model.generateContent([prompt, image]);
        const response = await result.response;
        const text = response.text();
        const ingredients = text
            .split(/[,\n]/)
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0)
            .map(normalizeIngredientName);
        return ingredients;
    }
    catch (error) {
        console.error('Error analyzing ingredients from image:', error);
        throw new Error('Failed to analyze ingredients from image');
    }
};
exports.analyzeIngredientsFromText = analyzeIngredientsFromText;
const normalizeIngredientName = (ingredientName) => {
    let cleanedName = ingredientName
        .replace(/[^\w\s-]/g, '')
        .trim();
    const eNumberMap = {
        'E102': 'Tartrazine',
        'E951': 'Aspartame',
        'E211': 'Sodium Benzoate',
        'E420': 'Sorbitol',
        'E621': 'Monosodium Glutamate',
        'E320': 'Sugar',
        'E321': 'Sugar'
    };
    const eNumberMatch = Object.keys(eNumberMap).find(eNum => cleanedName.toUpperCase().includes(eNum));
    if (eNumberMatch) {
        return eNumberMap[eNumberMatch];
    }
    return cleanedName;
};
const getMimeType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    switch (ext) {
        case '.jpg':
        case '.jpeg':
            return 'image/jpeg';
        case '.png':
            return 'image/png';
        case '.webp':
            return 'image/webp';
        case '.gif':
            return 'image/gif';
        default:
            return 'image/jpeg';
    }
};
const deleteTempFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting temporary file:', err);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};
exports.deleteTempFile = deleteTempFile;
//# sourceMappingURL=ocrService.js.map