export interface IStaticIngredient {
  name: string;
  primary_name?: string;
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
  functional_class?: string;
  why_used?: string;
  codex_status?: string;
  adi_status?: string;
}

export const ingredientDatabase: IStaticIngredient[] = [
  {
    name: 'Sugar',
    primary_name: 'Sugar',
    scientificName: 'Sucrose',
    origin: 'Plant-based',
    purpose: ['Sweetener', 'Preservative', 'Texture enhancer'],
    aliases: ['sucrose', 'table sugar', 'cane sugar', 'white sugar', 'granulated sugar'],
    eNumbers: ['E320', 'E321'],
    safetyScore: 4,
    safetyExplanation: 'High consumption of added sugars is linked to increased risk of obesity, type 2 diabetes, and dental caries. The American Heart Association recommends limiting added sugars to no more than 6 teaspoons per day for women and 9 teaspoons for men.',
    ageConsiderations: {
      children: 'Added sugars should be limited in children\'s diets. The American Academy of Pediatrics recommends avoiding added sugars in children under 2 years of age.'
    },
    healthConditions: {
      diabetes: 'Individuals managing blood sugar levels should consume products containing sugar cautiously as it can cause rapid increases in blood glucose.',
      bloodPressure: 'High sugar intake may contribute to weight gain, which can affect blood pressure management.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Sweetener',
    why_used: 'Provides sweetness and enhances flavor',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'High Fructose Corn Syrup',
    primary_name: 'High Fructose Corn Syrup',
    scientificName: 'Glucose-Fructose',
    origin: 'Synthetic',
    purpose: ['Sweetener', 'Preservative', 'Texture enhancer'],
    aliases: ['HFCS', 'glucose-fructose syrup', 'corn sugar'],
    eNumbers: ['E967'],
    safetyScore: 3,
    safetyExplanation: 'Similar to regular sugar but may have different metabolic effects. Some studies suggest potential links to obesity and metabolic syndrome when consumed in excess.',
    ageConsiderations: {
      children: 'Should be limited in children\'s diets due to potential effects on developing metabolism and preference for sweet tastes.'
    },
    healthConditions: {
      diabetes: 'Can cause rapid increases in blood glucose levels. Individuals managing blood sugar should consume cautiously.',
      digestive: 'Some individuals may experience digestive discomfort with excessive consumption.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Sweetener',
    why_used: 'Provides sweetness and extends shelf life',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'Aspartame',
    primary_name: 'Aspartame',
    origin: 'Synthetic',
    purpose: ['Artificial sweetener', 'Calorie reducer'],
    aliases: ['NutraSweet', 'Equal', 'AminoSweet'],
    eNumbers: ['E951'],
    safetyScore: 6,
    safetyExplanation: 'An artificial sweetener that is approximately 200 times sweeter than sugar. Approved by regulatory agencies but should be consumed in moderation. People with phenylketonuria (PKU) must avoid aspartame.',
    ageConsiderations: {
      children: 'Artificial sweeteners are not recommended for regular consumption by children as they may affect taste preferences and developing metabolism.'
    },
    healthConditions: {
      diabetes: 'Does not raise blood glucose levels, making it suitable for those managing diabetes.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice. People with PKU must avoid aspartame.',
    functional_class: 'Sweetener',
    why_used: 'Provides intense sweetness without calories',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'Sodium Benzoate',
    primary_name: 'Sodium Benzoate',
    origin: 'Synthetic',
    purpose: ['Preservative', 'Antimicrobial agent'],
    aliases: ['benzoic acid sodium salt'],
    eNumbers: ['E211'],
    safetyScore: 7,
    safetyExplanation: 'Common preservative effective against bacteria, yeasts, and molds. Generally recognized as safe by the FDA when used within approved limits.',
    ageConsiderations: {
      children: 'Safe when used within regulatory limits, but frequent consumption of products with preservatives should be minimized in children\'s diets.'
    },
    healthConditions: {
      digestive: 'In sensitive individuals, may cause mild digestive upset.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Preservative',
    why_used: 'Prevents microbial growth and extends shelf life',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'Tartrazine',
    primary_name: 'Tartrazine',
    origin: 'Synthetic',
    purpose: ['Food coloring', 'Yellow colorant'],
    aliases: ['FD&C Yellow No. 5', 'E102'],
    eNumbers: ['E102'],
    safetyScore: 5,
    safetyExplanation: 'Synthetic yellow food coloring. May cause allergic reactions in sensitive individuals and hyperactivity in some children.',
    ageConsiderations: {
      children: 'Should be limited in children\'s diets, especially those with known sensitivities or hyperactivity concerns.'
    },
    healthConditions: {
      digestive: 'May cause digestive upset in sensitive individuals.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Colour',
    why_used: 'Provides lemon-yellow colour',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'Caffeine',
    primary_name: 'Caffeine',
    scientificName: '1,3,7-Trimethylxanthine',
    origin: 'Plant-based',
    purpose: ['Stimulant', 'Flavor enhancer'],
    aliases: ['1,3,7-Trimethylxanthine', 'Coffeeine'],
    eNumbers: [],
    safetyScore: 7,
    safetyExplanation: 'Natural stimulant that can enhance alertness. Safe in moderate amounts but excessive intake can cause anxiety, sleep issues, and other symptoms.',
    ageConsiderations: {
      children: 'Should be limited in children\'s diets. The American Academy of Pediatrics discourages caffeine consumption in children.'
    },
    healthConditions: {
      bloodPressure: 'May cause temporary increases in blood pressure in sensitive individuals.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Stimulant',
    why_used: 'Provides stimulant effects and enhances alertness',
    codex_status: 'permitted_with_limits',
    adi_status: 'specified'
  },
  {
    name: 'Monosodium Glutamate',
    primary_name: 'Monosodium Glutamate',
    scientificName: 'Sodium glutamate',
    origin: 'Synthetic',
    purpose: ['Flavor enhancer', 'Umami taste'],
    aliases: ['MSG', 'AJI-NO-MOTO'],
    eNumbers: ['E621'],
    safetyScore: 8,
    safetyExplanation: 'Flavor enhancer that provides umami taste. Extensively studied and considered safe by major health authorities when consumed in normal amounts.',
    ageConsiderations: {
      children: 'Safe for children when used in normal culinary amounts.'
    },
    healthConditions: {
      digestive: 'Some individuals may be sensitive to MSG and experience mild symptoms.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Flavor enhancer',
    why_used: 'Provides umami taste and enhances flavor',
    codex_status: 'permitted',
    adi_status: 'not_specified'
  },
  {
    name: 'Sorbitol',
    primary_name: 'Sorbitol',
    origin: 'Plant-based',
    purpose: ['Sweetener', 'Humectant', 'Texture enhancer'],
    aliases: ['glucitol', 'E967'],
    eNumbers: ['E420'],
    safetyScore: 7,
    safetyExplanation: 'Sugar alcohol that provides sweetness with fewer calories than sugar. Generally safe but may cause digestive issues in large amounts.',
    ageConsiderations: {
      children: 'Safe in moderate amounts but may cause digestive upset if consumed in large quantities.'
    },
    healthConditions: {
      digestive: 'May cause digestive upset and diarrhea in sensitive individuals or when consumed in large amounts.'
    },
    disclaimer: 'Information provided for educational purposes only. Not intended as medical advice.',
    functional_class: 'Sweetener',
    why_used: 'Provides sweetness with fewer calories and acts as humectant',
    codex_status: 'permitted',
    adi_status: 'not_specified'
  }
];