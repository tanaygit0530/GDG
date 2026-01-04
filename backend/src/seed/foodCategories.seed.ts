import FoodCategory from "../models/FoodCategory";

export const seedFoodCategories = async () => {
  await FoodCategory.deleteMany();

  await FoodCategory.insertMany([
    {
      category_code: "14.1.4",
      category_name: "Water-based flavoured drinks",
      description: "CXS 192 Annex B",
    },
    {
      category_code: "05.2",
      category_name: "Confectionery",
      description: "CXS 192 Annex B",
    },
    {
      category_code: "07.2",
      category_name: "Fine bakery wares",
      description: "CXS 192 Annex B",
    },
    {
      category_code: "12.6",
      category_name: "Sauces and similar products",
      description: "CXS 192 Annex B",
    },
    {
      category_code: "01.7",
      category_name: "Dairy-based desserts",
      description: "CXS 192 Annex B",
    },
  ]);
};