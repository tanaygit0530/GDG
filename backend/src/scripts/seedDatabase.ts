import dotenv from 'dotenv';
import connectDB from '../config/db';
import Ingredient from '../models/Ingredient';
import { ingredientDatabase, IStaticIngredient } from '../data/ingredientDatabase';

dotenv.config();

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();
    
    // Clear existing ingredients
    await Ingredient.deleteMany({});
    
    // Insert the ingredient data with name field for compatibility
    const ingredientsWithNames = ingredientDatabase.map(ing => ({
      ...ing,
      name: ing.name,
      primary_name: ing.primary_name || ing.name
    }));
    
    await Ingredient.insertMany(ingredientsWithNames);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();