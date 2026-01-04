// src/models/IngredientADI.ts
import { Schema, model, Document } from "mongoose";

export interface IIngredientADI extends Document {
  ig_id: string; // Reference to Ingredient
  adi_min_mg_per_kg?: number;
  adi_max_mg_per_kg?: number;
  adi_unit?: string; // mg/kg bw, GMP, etc.
  source?: string; // JECFA / Codex
  notes?: string;
}

const IngredientADISchema = new Schema(
  {
    ig_id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    adi_min_mg_per_kg: {
      type: Number,
    },
    adi_max_mg_per_kg: {
      type: Number,
    },
    adi_unit: {
      type: String,
    },
    source: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "ingredient_adi",
  }
);

export default model<IIngredientADI>("IngredientADI", IngredientADISchema);