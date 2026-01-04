import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

/**
 * Analyzes an image to extract ingredient information using Gemini API
 * @param imagePath Path to the uploaded image
 * @returns Array of ingredient names extracted from the image
 */
export const analyzeIngredientsFromText = async (imagePath: string): Promise<string[]> => {
  try {
    // Check if the file exists before reading
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file does not exist: ${imagePath}`);
    }
    
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    const imageBase64 = imageBuffer.toString('base64');
    
    // Prepare the prompt for ingredient extraction
    const prompt = `Analyze this food product label image and extract the ingredient list. 
    Return only the ingredient names as a comma-separated list. 
    Normalize the ingredient names to their common forms (e.g., "E102" should become "Tartrazine", "Aspartame" instead of "E951"). 
    Focus only on the ingredients themselves, not other text on the label.`;
    
    // Prepare the image for the API
    const image = {
      inlineData: {
        data: imageBase64,
        mimeType: getMimeType(imagePath)
      }
    };
    
    // Generate content using Gemini
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response to extract ingredient names
    // Split by commas or newlines and clean up the results
    const ingredients = text
      .split(/[,\n]/)
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient.length > 0)
      .map(normalizeIngredientName);
    
    return ingredients;
  } catch (error) {
    console.error('Error analyzing ingredients from image:', error);
    throw new Error('Failed to analyze ingredients from image');
  }
};

/**
 * Normalizes ingredient names to standard forms
 * @param ingredientName Raw ingredient name from OCR
 * @returns Normalized ingredient name
 */
const normalizeIngredientName = (ingredientName: string): string => {
  // Clean up the ingredient name
  let cleanedName = ingredientName
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .trim();
  
  // Map common E-numbers to their names
  const eNumberMap: { [key: string]: string } = {
    'E102': 'Tartrazine',
    'E951': 'Aspartame',
    'E211': 'Sodium Benzoate',
    'E420': 'Sorbitol',
    'E621': 'Monosodium Glutamate',
    'E320': 'Sugar',
    'E321': 'Sugar'
  };
  
  // Check if the ingredient name is an E-number
  const eNumberMatch = Object.keys(eNumberMap).find(eNum => 
    cleanedName.toUpperCase().includes(eNum)
  );
  
  if (eNumberMatch) {
    return eNumberMap[eNumberMatch];
  }
  
  return cleanedName;
};

/**
 * Gets the MIME type based on file extension
 * @param filePath Path to the file
 * @returns MIME type string
 */
const getMimeType = (filePath: string): string => {
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
      return 'image/jpeg'; // Default fallback
  }
};

/**
 * Deletes a temporary file
 * @param filePath Path to the file to delete
 */
export const deleteTempFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting temporary file:', err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};