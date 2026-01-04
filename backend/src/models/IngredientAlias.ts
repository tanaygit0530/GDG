// src/models/IngredientAlias.ts
import { Schema, model, Document } from "mongoose";

export interface IIngredientAlias extends Document {
  ig_id: string; // Reference to Ingredient
  alias_name: string;
  normalized_alias: string;
  alias_type: string; // INS, E_number, etc.
}

const IngredientAliasSchema = new Schema(
  {
    ig_id: {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true,
    },
    alias_name: {
      type: String,
      required: true,
    },
    normalized_alias: {
      type: String,
      required: true,
    },
    alias_type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "ingredient_aliases",
  }
);

export default model<IIngredientAlias>("IngredientAlias", IngredientAliasSchema);