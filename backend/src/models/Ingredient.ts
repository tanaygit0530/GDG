export interface Ingredient {
  name: string;
  scientificName?: string;
  origin: 'Plant-based' | 'Animal-based' | 'Synthetic';
  purpose: string[];
  aliases: string[];
  eNumbers: string[];
  safetyScore: number;
  safetyExplanation: string;
  ageConsiderations?: {
    children: string;
  };
  healthConditions?: {
    diabetes?: string;
    bloodPressure?: string;
    digestive?: string;
  };
  disclaimer: string;
}