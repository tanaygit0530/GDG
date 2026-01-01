import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface Ingredient {
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

async function getIngredient(name: string, context?: {
  ageGroup?: string;
  healthConditions?: string[];
  consumptionFrequency?: string;
}): Promise<Ingredient | null> {
  try {
    // Build query string from context
    const searchParams = new URLSearchParams();
    if (context?.ageGroup) searchParams.append('ageGroup', context.ageGroup);
    if (context?.healthConditions) {
      context.healthConditions.forEach(condition => {
        searchParams.append('healthConditions', condition);
      });
    }
    if (context?.consumptionFrequency) searchParams.append('consumptionFrequency', context.consumptionFrequency);
    
    const queryString = searchParams.toString();
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/ingredients/${encodeURIComponent(name)}${queryString ? '?' + queryString : ''}`;
    
    const res = await fetch(url);
    
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch ingredient: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching ingredient:', error);
    return null;
  }
}

export default async function IngredientPage({ params, searchParams }: { 
  params: { name: string }; 
  searchParams: { [key: string]: string | string[] | undefined } 
}) {
  // Parse context from search parameters
  const context = {
    ageGroup: Array.isArray(searchParams.ageGroup) ? searchParams.ageGroup[0] : searchParams.ageGroup,
    healthConditions: Array.isArray(searchParams.healthConditions) ? searchParams.healthConditions : [searchParams.healthConditions].filter(Boolean) as string[],
    consumptionFrequency: Array.isArray(searchParams.consumptionFrequency) ? searchParams.consumptionFrequency[0] : searchParams.consumptionFrequency,
  };

  const ingredient = await getIngredient(params.name, context);

  if (!ingredient) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl">{ingredient.name}</CardTitle>
                {ingredient.scientificName && (
                  <p className="text-gray-600 mt-1">Also known as: <em>{ingredient.scientificName}</em></p>
                )}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium">Safety Score:</span>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${ingredient.safetyScore >= 8 ? 'border-green-500 text-green-700' : 
                        ingredient.safetyScore >= 6 ? 'border-yellow-500 text-yellow-700' : 
                        'border-red-500 text-red-700'}
                    `}
                  >
                    {ingredient.safetyScore}/10
                  </Badge>
                </div>
                <Progress value={ingredient.safetyScore * 10} className="w-32 h-2" />
              </div>
            </div>
            <CardDescription className="mt-4">
              Origin: {ingredient.origin} | Used as: {ingredient.purpose.join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">About This Ingredient</h3>
              <p className="text-gray-700">{ingredient.safetyExplanation}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Context Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Age Group</label>
                  <Select 
                    value={context.ageGroup || ''} 
                    onValueChange={(value) => {
                      const params = new URLSearchParams();
                      if (value) params.append('ageGroup', value);
                      if (context.healthConditions) context.healthConditions.forEach(condition => params.append('healthConditions', condition));
                      if (context.consumptionFrequency) params.append('consumptionFrequency', context.consumptionFrequency);
                      window.location.search = params.toString();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="child">Child</SelectItem>
                      <SelectItem value="adult">Adult</SelectItem>
                      <SelectItem value="elderly">Elderly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Health Conditions</label>
                  <Select 
                    value={context.healthConditions?.[0] || ''} 
                    onValueChange={(value) => {
                      const params = new URLSearchParams();
                      if (context.ageGroup) params.append('ageGroup', context.ageGroup);
                      if (value) params.append('healthConditions', value);
                      if (context.consumptionFrequency) params.append('consumptionFrequency', context.consumptionFrequency);
                      window.location.search = params.toString();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="blood-pressure">Blood Pressure</SelectItem>
                      <SelectItem value="digestive">Digestive Sensitivity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Consumption Frequency</label>
                  <Select 
                    value={context.consumptionFrequency || ''} 
                    onValueChange={(value) => {
                      const params = new URLSearchParams();
                      if (context.ageGroup) params.append('ageGroup', context.ageGroup);
                      if (context.healthConditions) context.healthConditions.forEach(condition => params.append('healthConditions', condition));
                      if (value) params.append('consumptionFrequency', value);
                      window.location.search = params.toString();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Aliases & Names</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Name: {ingredient.name}</Badge>
                {ingredient.scientificName && (
                  <Badge variant="secondary">Scientific: {ingredient.scientificName}</Badge>
                )}
                {ingredient.aliases.map((alias, index) => (
                  <Badge key={index} variant="outline">{alias}</Badge>
                ))}
                {ingredient.eNumbers.map((eNum, index) => (
                  <Badge key={index} variant="outline">{eNum}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Purpose</h3>
              <ul className="list-disc pl-5 space-y-1">
                {ingredient.purpose.map((purpose, index) => (
                  <li key={index}>{purpose}</li>
                ))}
              </ul>
            </div>

            {(ingredient.ageConsiderations || ingredient.healthConditions) && (
              <div className="space-y-4">
                {ingredient.ageConsiderations && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Age Considerations</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-yellow-800">{ingredient.ageConsiderations.children}</p>
                    </div>
                  </div>
                )}

                {ingredient.healthConditions && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Health Considerations</h3>
                    <div className="space-y-3">
                      {ingredient.healthConditions.diabetes && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800">{ingredient.healthConditions.diabetes}</p>
                        </div>
                      )}
                      {ingredient.healthConditions.bloodPressure && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800">{ingredient.healthConditions.bloodPressure}</p>
                        </div>
                      )}
                      {ingredient.healthConditions.digestive && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800">{ingredient.healthConditions.digestive}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
              <p className="text-gray-700 text-sm italic">{ingredient.disclaimer}</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>
            Information provided for educational purposes only. 
            Not intended as medical advice. Consult healthcare professionals for specific health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}