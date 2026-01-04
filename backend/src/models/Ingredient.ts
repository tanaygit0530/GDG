// src/models/Ingredient.ts
import { Schema, model, Document } from "mongoose";

// Define the interface for Ingredient
export interface IIngredient extends Document {
  // Original fields for safety scoring
  name: string;
  scientificName?: string;
  origin?: string;
  purpose?: string[];
  aliases: string[];
  eNumbers: string[];
  safetyScore?: number;
  safetyExplanation?: string;
  ageConsiderations?: {
    children?: string;
  };
  healthConditions?: {
    diabetes?: string;
    bloodPressure?: string;
    digestive?: string;
  };
  disclaimer?: string;
  
  // New fields for regulatory compliance
  primary_name?: string;
  functional_class?: string;
  why_used?: string;
  codex_status?: string; // permitted | permitted_with_limits | not_permitted
  adi_status?: string; // specified | not_specified
  
  createdAt?: Date;
  updatedAt?: Date;
}

const IngredientSchema = new Schema(
  {
    // Original fields for safety scoring
    name: {
      type: String,
      required: false, // Optional for backward compatibility
      trim: true,
    },
    scientificName: {
      type: String,
    },
    origin: {
      type: String,
    },
    purpose: [{
      type: String,
    }],
    aliases: [{
      type: String,
    }],
    eNumbers: [{
      type: String,
    }],
    safetyScore: {
      type: Number,
    },
    safetyExplanation: {
      type: String,
    },
    ageConsiderations: {
      children: String,
    },
    healthConditions: {
      diabetes: String,
      bloodPressure: String,
      digestive: String,
    },
    disclaimer: {
      type: String,
    },
    
    // New fields for regulatory compliance
    primary_name: {
      type: String,
      required: true, // At least one of name or primary_name is required
    },
    functional_class: {
      type: String,
      required: true,
    },
    why_used: {
      type: String,
    },
    codex_status: {
      type: String, // permitted | permitted_with_limits | not_permitted
    },
    adi_status: {
      type: String, // specified | not_specified
    },
  },
  {
    timestamps: true,
    collection: "ingredients",
  }
);

export default model<IIngredient>("Ingredient", IngredientSchema);
