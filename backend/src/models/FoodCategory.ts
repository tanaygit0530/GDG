// src/models/FoodCategory.ts
import { Schema, model } from "mongoose";

const FoodCategorySchema = new Schema(
  {
    category_code: {
      type: String,
      required: true,
      unique: true, // e.g. 14.1.4
    },
    category_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    collection: "food_categories",
  }
);

export default model("FoodCategory", FoodCategorySchema);
