import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Info, Users, Heart, BookOpen, Calendar, Syringe, Apple, Activity } from 'lucide-react';

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
    const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/ingredients/${encodeURIComponent(name)}${queryString ? '?' + queryString : ''}`;
    
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
    ageGroup: Array.isArray(searchParams.ageGroup) ? searchParams.ageGroup[0] : searchParams.ageGroup as string,
    healthConditions: Array.isArray(searchParams.healthConditions) ? searchParams.healthConditions as string[] : searchParams.healthConditions ? [searchParams.healthConditions as string] : [],
    consumptionFrequency: Array.isArray(searchParams.consumptionFrequency) ? searchParams.consumptionFrequency[0] : searchParams.consumptionFrequency as string,
  };

  const ingredient = await getIngredient(params.name, context);

  if (!ingredient) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Ingredient Card */}
        <Card className="mb-8 border-blue-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-3xl">{ingredient.name}</CardTitle>
                {ingredient.scientificName && (
                  <p className="text-gray-600 mt-1 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Scientific name: <em>{ingredient.scientificName}</em>
                  </p>
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
            <CardDescription className="mt-4 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Origin: {ingredient.origin} | Used as: {ingredient.purpose.join(', ')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* What is this ingredient section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                What is this ingredient?
              </h3>
              <p className="text-gray-700">{ingredient.safetyExplanation}</p>
            </div>

            {/* Why is it used section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-500" />
                Why is it used?
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {ingredient.purpose.map((purpose, index) => (
                  <li key={index} className="text-gray-700">{purpose}</li>
                ))}
              </ul>
            </div>

            {/* Origin section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-purple-200">
                <CardHeader>
                  <div className="flex items-center">
                    <Apple className="h-5 w-5 mr-2 text-purple-500" />
                    <CardTitle>Origin</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{ingredient.origin}</p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader>
                  <div className="flex items-center">
                    <Info className="h-5 w-5 mr-2 text-blue-500" />
                    <CardTitle>Consumption Frequency</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Context: {context.consumptionFrequency || 'Occasional'}</p>
                </CardContent>
              </Card>
            </div>

            {/* Alias & Hidden Names */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Info className="h-5 w-5 mr-2 text-yellow-500" />
                Alias & Hidden Names
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center">
                  <span className="font-medium mr-1">Name:</span> {ingredient.name}
                </Badge>
                {ingredient.scientificName && (
                  <Badge variant="secondary" className="flex items-center">
                    <span className="font-medium mr-1">Scientific:</span> {ingredient.scientificName}
                  </Badge>
                )}
                {ingredient.aliases.map((alias, index) => (
                  <Badge key={index} variant="outline" className="flex items-center">
                    <span className="font-medium mr-1">Alias:</span> {alias}
                  </Badge>
                ))}
                {ingredient.eNumbers.map((eNum, index) => (
                  <Badge key={index} variant="outline" className="flex items-center">
                    <span className="font-medium mr-1">E-Number:</span> {eNum}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Safety Score with Explanation */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-500" />
                Safety Score Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Safety Score: {ingredient.safetyScore}/10</span>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${ingredient.safetyScore >= 8 ? 'border-green-500 text-green-700' : 
                        ingredient.safetyScore >= 6 ? 'border-yellow-500 text-yellow-700' : 
                        'border-red-500 text-red-700'}
                    `}
                  >
                    {ingredient.safetyScore >= 8 ? 'Safe' : 
                     ingredient.safetyScore >= 6 ? 'Moderate' : 'Caution'}
                  </Badge>
                </div>
                <p className="text-gray-700">{ingredient.safetyExplanation}</p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Scoring Factors:</h4>
                  <ul className="list-disc pl-5 text-blue-700 space-y-1">
                    <li>Regulatory approval status</li>
                    <li>Acceptable Daily Intake (ADI) levels</li>
                    <li>Scientific research consensus</li>
                    <li>Usage concentration in food products</li>
                    <li>Age-specific considerations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Age-sensitive notes */}
            {ingredient.ageConsiderations && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-500" />
                  Age-Sensitive Notes
                </h3>
                <div className="flex items-start space-x-4">
                  <Heart className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800 mb-2">Special Considerations for Children</h4>
                    <p className="text-red-700">{ingredient.ageConsiderations.children}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Context Settings */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-500" />
                Context Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Age Group
                  </label>
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
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    Health Conditions
                  </label>
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
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <Activity className="h-4 w-4 mr-1" />
                    Consumption Frequency
                  </label>
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

            {/* Health-condition awareness */}
            {ingredient.healthConditions && (
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Health Condition Awareness
                </h3>
                <div className="space-y-4">
                  {ingredient.healthConditions.diabetes && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Syringe className="h-5 w-5 text-red-500 mr-2" />
                        <h4 className="font-medium text-red-800">Diabetes Considerations</h4>
                      </div>
                      <p className="text-red-700">{ingredient.healthConditions.diabetes}</p>
                    </div>
                  )}
                  {ingredient.healthConditions.bloodPressure && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Heart className="h-5 w-5 text-red-500 mr-2" />
                        <h4 className="font-medium text-red-800">Blood Pressure Considerations</h4>
                      </div>
                      <p className="text-red-700">{ingredient.healthConditions.bloodPressure}</p>
                    </div>
                  )}
                  {ingredient.healthConditions.digestive && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Activity className="h-5 w-5 text-red-500 mr-2" />
                        <h4 className="font-medium text-red-800">Digestive Considerations</h4>
                      </div>
                      <p className="text-red-700">{ingredient.healthConditions.digestive}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Clear disclaimer blocks */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Disclaimer
              </h3>
              <p className="text-gray-700 text-sm italic">{ingredient.disclaimer}</p>
              <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Important Note:</h4>
                <p className="text-yellow-700 text-sm">
                  This information is provided for educational purposes only and should not be considered medical advice. 
                  Always consult with healthcare professionals for specific health concerns and dietary recommendations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <p>
            Information provided for educational purposes only. 
            Not intended as medical advice. Consult healthcare professionals for specific health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}