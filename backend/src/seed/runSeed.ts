import mongoose from "mongoose";
import dotenv from "dotenv";

import { seedFoodCategories } from "./foodCategories.seed";
import { seedIngredients } from "./ingredients.seed";
import { seedIngredientAliases } from "./ingredientAliases.seed";
import { seedIngredientADI } from "./ingredientADI.seed";
import { seedIngredientPermissions } from "./ingredientPermissions.seed";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    await seedFoodCategories();
    await seedIngredients();
    await seedIngredientAliases();
    await seedIngredientADI();
    await seedIngredientPermissions();

    console.log("✅ Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
})();