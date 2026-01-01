'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock, AlertTriangle, CheckCircle, BookOpen } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [educationalTip, setEducationalTip] = useState('');

  // Educational tips for loading states
  const educationalTips = [
    "Did you know? E102 (Tartrazine) is a synthetic yellow food dye that some studies suggest may be linked to hyperactivity in children.",
    "Many food additives have multiple names - for example, Ascorbic Acid is also known as Vitamin C.",
    "The safety of food additives is evaluated based on Acceptable Daily Intake (ADI) levels set by food safety authorities.",
    "Some ingredients like E951 (Aspartame) are artificial sweeteners that are much sweeter than sugar, so less is needed.",
    "Natural doesn't always mean safer - many natural substances can be harmful in large quantities."
  ];

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
    
    // Set a random educational tip
    const randomTip = educationalTips[Math.floor(Math.random() * educationalTips.length)];
    setEducationalTip(randomTip);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Save to recent searches
      const updatedRecent = [searchTerm.trim(), ...recentSearches.filter(item => item !== searchTerm.trim())].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecent));
      setRecentSearches(updatedRecent);
      
      window.location.href = `/ingredient/${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  // Mock suggestions for E-numbers and common ingredients
  const mockSuggestions = [
    'Aspartame', 'E951', 'Tartrazine', 'E102', 'Sodium Benzoate', 'E211',
    'Monosodium Glutamate', 'E621', 'Sorbitol', 'E420', 'Caffeine',
    'High Fructose Corn Syrup', 'Artificial Colors', 'Preservatives'
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setTimeout(() => {
      window.location.href = `/ingredient/${encodeURIComponent(suggestion)}`;
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Search Ingredients
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find clear, contextual information about any food ingredient
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Find Ingredient Information</CardTitle>
            <CardDescription>
              Search for any ingredient by name, E-number, or scientific name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search for ingredient (e.g., Aspartame, E951, Tartrazine...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 py-6 text-lg"
                  />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-gray-600">
                    Enter ingredient name, E-number, or scientific name
                  </p>
                  <Button type="submit" className="px-6 py-5">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>
            </form>

            {searchTerm && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Smart Suggestions:</h3>
                <div className="flex flex-wrap gap-2">
                  {mockSuggestions
                    .filter(suggestion => 
                      suggestion.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .slice(0, 6)
                    .map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                </div>
              </div>
            )}

            {!searchTerm && recentSearches.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <h3 className="font-medium">Recent Searches:</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((recent, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(recent)}
                    >
                      {recent}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {isLoading ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Searching Ingredient...</CardTitle>
              <CardDescription>
                Analyzing ingredient information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  <p className="text-gray-700">{educationalTip}</p>
                </div>
                
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                  <CardTitle>What We Explain</CardTitle>
                </div>
                <CardDescription>
                  Clear, contextual information about ingredients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>What the ingredient is and what it does</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Why it's used in food products</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Origin (Plant/Animal/Synthetic)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Aliases and hidden names</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Safety score with explanation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Age-sensitive notes (especially for children)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                  <CardTitle>Educational Approach</CardTitle>
                </div>
                <CardDescription>
                  Information for awareness, not fear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Contextual, not absolute ratings</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Based on scientific evidence</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>No medical advice disclaimers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>Child-focused safety considerations</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span>India-relevant context</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <p className="mb-4">
            <strong>Educational Purpose:</strong> Information provided for educational purposes only. 
            Not intended as medical advice. Consult healthcare professionals for specific health concerns.
          </p>
          <p>
            This platform explains ingredients in a contextual, non-fear-based manner to promote awareness and informed choices.
          </p>
        </div>
      </div>
    </div>
  );
}