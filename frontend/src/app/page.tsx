'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Search } from 'lucide-react';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/ingredient/${encodeURIComponent(searchTerm.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ingredient Transparency & Consumer Awareness
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understand what's in your food with clear, educational explanations - no fear-based ratings
          </p>
        </header>

        <Tabs defaultValue="search" className="w-full max-w-2xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="search" className="text-lg">Search Ingredient</TabsTrigger>
            <TabsTrigger value="scan" className="text-lg">Scan Product</TabsTrigger>
          </TabsList>
          <TabsContent value="search" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Find Ingredient Information</CardTitle>
                <CardDescription>
                  Search for any ingredient by name, E-number, or scientific name
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSearch} className="flex flex-col space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ingredient-search">Ingredient Name</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="ingredient-search"
                        placeholder="e.g., Aspartame, E951, Tartrazine..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" className="px-4">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scan" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Scan Product Label</CardTitle>
                <CardDescription>
                  Upload a photo of a food product label to analyze its ingredients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Upload a photo of a food product label</p>
                  <Button asChild>
                    <Link href="/scan">Upload Product Image</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-16 text-center text-sm text-gray-600 max-w-2xl mx-auto">
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