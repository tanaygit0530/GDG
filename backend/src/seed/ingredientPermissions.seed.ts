import IngredientPermission from "../models/IngredientPermission";
import Ingredient from "../models/Ingredient";

export const seedIngredientPermissions = async () => {
  await IngredientPermission.deleteMany();

  const ingredients = await Ingredient.find();
  const map = Object.fromEntries(
    ingredients.map(i => [i.primary_name, i._id])
  );

  await IngredientPermission.insertMany([
    {
      ig_id: map["Sunset Yellow FCF"],
      category_code: "14.1.4",
      max_level: "100 mg/kg",
      usage_note: "Colour in flavoured drinks",
    },
    {
      ig_id: map["Tartrazine"],
      category_code: "05.2",
      max_level: "300 mg/kg",
      usage_note: "Colour in confectionery",
    },
    {
      ig_id: map["Sodium Benzoate"],
      category_code: "14.1.4",
      max_level: "150 mg/kg",
      usage_note: "Preservative in beverages",
    },
    {
      ig_id: map["Citric Acid"],
      category_code: "12.6",
      max_level: "GMP",
      usage_note: "Acidity regulator",
    },
  ]);
};