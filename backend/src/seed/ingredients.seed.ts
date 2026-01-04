import Ingredient from "../models/Ingredient";

export const seedIngredients = async () => {
  await Ingredient.deleteMany();

  return await Ingredient.insertMany([
    {
      name: "Sunset Yellow FCF",
      primary_name: "Sunset Yellow FCF",
      functional_class: "Colour",
      origin: "Synthetic",
      why_used: "Provides orange-yellow colour",
      codex_status: "permitted_with_limits",
      adi_status: "specified",
    },
    {
      name: "Tartrazine",
      primary_name: "Tartrazine",
      functional_class: "Colour",
      origin: "Synthetic",
      why_used: "Provides lemon-yellow colour",
      codex_status: "permitted_with_limits",
      adi_status: "specified",
    },
    {
      name: "Sodium Benzoate",
      primary_name: "Sodium Benzoate",
      functional_class: "Preservative",
      origin: "Synthetic",
      why_used: "Prevents microbial growth",
      codex_status: "permitted_with_limits",
      adi_status: "specified",
    },
    {
      name: "Citric Acid",
      primary_name: "Citric Acid",
      functional_class: "Acidity regulator",
      origin: "Fermentation",
      why_used: "Controls acidity",
      codex_status: "permitted",
      adi_status: "not_specified",
    },
  ]);
};