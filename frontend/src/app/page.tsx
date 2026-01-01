'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Info, Heart, Star, Users, Search, Scan, AlertTriangle, Lightbulb, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Understand What's Really in Your Food
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Ingredient-level explanations. No fear. No black-box ratings.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Search Ingredient
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
              <Link href="/scan">
                <Scan className="mr-2 h-5 w-5" />
                Scan Product Label
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Hidden Ingredient Problem
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Food labels are filled with confusing names, E-numbers, and technical terms that consumers don't understand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="mb-2">E-Numbers</CardTitle>
              <CardDescription>
                E102, E951, E211 - what do these mean? We explain the actual ingredients behind the codes.
              </CardDescription>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="mb-2">Hidden Names</CardTitle>
              <CardDescription>
                Different names for the same ingredient. We map all aliases to provide clarity.
              </CardDescription>
            </Card>
            
            <Card className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="mb-2">Confusing Labels</CardTitle>
              <CardDescription>
                Technical terminology that hides the real ingredients. We simplify the complex.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Three simple steps to ingredient transparency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search or Scan</h3>
              <p className="text-gray-600">
                Search for any ingredient or scan a product label to extract ingredient information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Ingredient Analysis</h3>
              <p className="text-gray-600">
                We analyze each ingredient using our comprehensive database of ingredient information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Contextual Explanation</h3>
              <p className="text-gray-600">
                Get clear, contextual explanations about each ingredient's purpose and safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We prioritize education, transparency, and ethical design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ingredient-First Approach</h3>
                  <p className="text-gray-600">
                    We focus on explaining individual ingredients rather than shaming entire products.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Explainable Scoring</h3>
                  <p className="text-gray-600">
                    Our safety scores come with clear explanations of how they're calculated.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Child-Focused Awareness</h3>
                  <p className="text-gray-600">
                    Special considerations for children's health and development.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">India-Relevant Context</h3>
                  <p className="text-gray-600">
                    Understanding ingredients in the context of Indian food habits and regulations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Ethics */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Built on Trust & Ethics
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            We prioritize your privacy and education over fear-mongering
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Educational Only</h3>
              <p className="text-sm text-gray-600">Information for awareness, not medical advice</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Medical Advice</h3>
              <p className="text-sm text-gray-600">Clear disclaimers about our educational purpose</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Fear-Based Ratings</h3>
              <p className="text-sm text-gray-600">Balanced, contextual information</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Privacy-First OCR</h3>
              <p className="text-sm text-gray-600">Images auto-deleted after processing</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}