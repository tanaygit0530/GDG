import IngredientAlias from "../models/IngredientAlias";
import Ingredient from "../models/Ingredient";

export const seedIngredientAliases = async () => {
  await IngredientAlias.deleteMany();

  const ingredients = await Ingredient.find();

  const map = Object.fromEntries(
    ingredients.map(i => [i.primary_name, i._id])
  );

  await IngredientAlias.insertMany([
    {
      ig_id: map["Sunset Yellow FCF"],
      alias_name: "110",
      normalized_alias: "110",
      alias_type: "INS",
    },
    {
      ig_id: map["Sunset Yellow FCF"],
      alias_name: "E110",
      normalized_alias: "e110",
      alias_type: "E_number",
    },
    {
      ig_id: map["Tartrazine"],
      alias_name: "102",
      normalized_alias: "102",
      alias_type: "INS",
    },
    {
      ig_id: map["Tartrazine"],
      alias_name: "E102",
      normalized_alias: "e102",
      alias_type: "E_number",
    },
    {
      ig_id: map["Sodium Benzoate"],
      alias_name: "211",
      normalized_alias: "211",
      alias_type: "INS",
    },
    {
      ig_id: map["Citric Acid"],
      alias_name: "330",
      normalized_alias: "330",
      alias_type: "INS",
    },
  ]);
};