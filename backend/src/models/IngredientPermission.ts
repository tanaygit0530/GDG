// src/models/IngredientPermission.ts
import { Schema, model, Document } from "mongoose";

export interface IIngredientPermission extends Document {
  ig_id: string; // Reference to Ingredient
  category_code: string; // Food category code
  max_level?: string; // Maximum permitted level (e.g. "100 mg/kg", "GMP")
  usage_note?: string; // Additional usage notes
}

const IngredientPermissionSchema = new Schema(
  {
    ig_id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    category_code: {
      type: String,
      required: true,
    },
    max_level: {
      type: String,
    },
    usage_note: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "ingredient_permissions",
  }
);

export default model<IIngredientPermission>("IngredientPermission", IngredientPermissionSchema);