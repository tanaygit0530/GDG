import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Info, Heart, Users, BookOpen, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why This Exists
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Understanding the problem we're solving and our approach
          </p>
        </header>

        <div className="space-y-8">
          {/* Why Existing Apps Fail */}
          <Card className="border-blue-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                <CardTitle className="text-2xl">Why Existing Apps Fall Short</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Fear-Based Approaches</h3>
                  <p className="text-gray-600">
                    Many existing apps use alarming warnings and red/green ratings that create unnecessary fear about food ingredients.
                  </p>
                  <p className="text-gray-600">
                    This approach doesn't help consumers understand the actual context of ingredient safety.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Black-Box Ratings</h3>
                  <p className="text-gray-600">
                    Most apps provide ratings without explaining how they arrived at their conclusions.
                  </p>
                  <p className="text-gray-600">
                    Users don't understand the science behind safety scores, making the information less actionable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Ingredient Literacy Matters */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <BookOpen className="h-6 w-6 text-green-500 mr-2" />
                <CardTitle className="text-2xl">Why Ingredient Literacy Matters</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Understanding food ingredients is crucial for making informed decisions, especially for families with children, 
                  people with dietary restrictions, and those managing health conditions.
                </p>
                <p className="text-gray-700">
                  Ingredient literacy empowers consumers to understand what they're eating rather than relying on fear-based 
                  or overly simplified ratings.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <h4 className="font-medium">Educational Empowerment</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Knowledge helps consumers make informed choices
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-medium">Contextual Understanding</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Safety depends on amount, frequency, and individual health
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-purple-500 mr-2" />
                      <h4 className="font-medium">Family Health</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      Special considerations for children and sensitive individuals
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Educational, Not Medical */}
          <Card className="border-yellow-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Info className="h-6 w-6 text-yellow-500 mr-2" />
                <CardTitle className="text-2xl">Educational, Not Medical</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our platform is designed as an educational resource, not a medical advisory service. 
                  We provide information to help users understand ingredients in context.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Our Approach:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                    <li>Provide scientific context for ingredient safety</li>
                    <li>Explain how safety varies by consumption amount and frequency</li>
                    <li>Highlight special considerations for children and sensitive individuals</li>
                    <li>Include disclaimers about our educational-only purpose</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* India-First Design Philosophy */}
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Users className="h-6 w-6 text-purple-500 mr-2" />
                <CardTitle className="text-2xl">India-First Design Philosophy</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our platform is designed with the Indian context in mind, recognizing unique food habits, 
                  dietary practices, and regulatory frameworks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Local Relevance</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Focus on ingredients common in Indian food products</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Understanding of local food processing methods</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Consideration of traditional food preservation methods</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cultural Sensitivity</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Respect for traditional food practices</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Consideration of dietary restrictions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Local regulatory compliance awareness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Values */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Our Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Shield className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Trust</h3>
                  <p className="text-sm text-gray-600">Transparent, science-based information</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Heart className="h-10 w-10 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Care</h3>
                  <p className="text-sm text-gray-600">Special focus on children and health</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <BookOpen className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-gray-600">Understanding over fear</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Eye className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Clarity</h3>
                  <p className="text-sm text-gray-600">Clear explanations, not black-box ratings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

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