import IngredientADI from "../models/IngredientADI";
import Ingredient from "../models/Ingredient";

export const seedIngredientADI = async () => {
  await IngredientADI.deleteMany();

  const ingredients = await Ingredient.find();
  const map = Object.fromEntries(
    ingredients.map(i => [i.primary_name, i._id])
  );

  await IngredientADI.insertMany([
    {
      ig_id: map["Sunset Yellow FCF"],
      adi_min_mg_per_kg: 0,
      adi_max_mg_per_kg: 4,
      adi_unit: "mg/kg bw",
      source: "JECFA / Codex",
      notes: "Numerical ADI",
    },
    {
      ig_id: map["Tartrazine"],
      adi_min_mg_per_kg: 0,
      adi_max_mg_per_kg: 7.5,
      adi_unit: "mg/kg bw",
      source: "JECFA / Codex",
      notes: "Numerical ADI",
    },
    {
      ig_id: map["Citric Acid"],
      adi_unit: "GMP",
      source: "Codex",
      notes: "ADI not specified",
    },
  ]);
};