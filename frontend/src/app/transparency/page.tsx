import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Info, Heart, Users, BookOpen, AlertTriangle, CheckCircle, FileText, Database, Calculator, Globe } from 'lucide-react';

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Ensure Transparency
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our commitment to open, explainable, and ethical ingredient analysis
          </p>
        </header>

        <div className="space-y-8">
          {/* How Scores Are Calculated */}
          <Card className="border-blue-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Calculator className="h-6 w-6 text-blue-500 mr-2" />
                <CardTitle className="text-2xl">How Safety Scores Are Calculated</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our safety scores (1-10) are calculated based on multiple scientific factors:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Primary Factors</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Regulatory approval status (FDA, EFSA, FSSAI)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Acceptable Daily Intake (ADI) levels</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Scientific research consensus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Usage concentration in food products</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Contextual Factors</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Age-specific considerations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Health condition sensitivities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Consumption frequency context</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                        <span>Interaction with other ingredients</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Safety scores are provided for educational purposes only and should not be considered medical advice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Data Is Used */}
          <Card className="border-green-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Database className="h-6 w-6 text-green-500 mr-2" />
                <CardTitle className="text-2xl">What Data We Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Our ingredient database is built from multiple authoritative sources:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-green-500 mr-2" />
                      <h4 className="font-medium">Regulatory Bodies</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• FDA guidelines</li>
                      <li>• EFSA assessments</li>
                      <li>• FSSAI regulations</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-blue-500 mr-2" />
                      <h4 className="font-medium">Scientific Research</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Peer-reviewed studies</li>
                      <li>• Systematic reviews</li>
                      <li>• Meta-analyses</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-purple-500 mr-2" />
                      <h4 className="font-medium">Industry Standards</h4>
                    </div>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Codex Alimentarius</li>
                      <li>• Industry best practices</li>
                      <li>• Usage guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Is NOT Done */}
          <Card className="border-red-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                <CardTitle className="text-2xl">What We Do NOT Do</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We maintain strict ethical boundaries to ensure our platform remains educational and non-alarming:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Medical Actions We Avoid</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No medical diagnoses or treatment recommendations</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No advice to stop or start consuming ingredients</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No personalized health assessments</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No replacement for professional medical advice</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold">Policy Actions We Avoid</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No product bans or blacklisting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No fear-based marketing</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No product endorsements</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                        <span>No commercial partnerships that compromise objectivity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Why Gemini is Used Only for OCR */}
          <Card className="border-purple-200">
            <CardHeader>
              <div className="flex items-center mb-2">
                <Globe className="h-6 w-6 text-purple-500 mr-2" />
                <CardTitle className="text-2xl">Why Gemini is Used Only for OCR</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  We use Google's Gemini AI model exclusively for Optical Character Recognition (OCR) to extract ingredient lists from product photos:
                </p>
                <div className="space-y-4 mt-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">OCR Specific Use:</h4>
                    <p className="text-purple-700">
                      Gemini is used only to convert images of ingredient lists into text. It does not analyze ingredient safety, 
                      generate health advice, or make recommendations. Once the text is extracted, our database provides the educational information.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Privacy Protection:</h4>
                    <p className="text-blue-700">
                      Images are processed temporarily and automatically deleted after OCR extraction. No images are stored, 
                      and no personal data is collected during the scanning process.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Ethical AI Use:</h4>
                    <p className="text-green-700">
                      We limit AI to a single, well-defined task (text extraction) to maintain explainability and avoid 
                      black-box decision making that could impact health information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Transparency Commitment */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl">Our Transparency Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Open Data Principles</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Clear source attribution for all information</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Explainable scoring methodology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Regular updates to reflect new research</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Clear disclaimers about educational purpose</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Ethical Standards</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Privacy-first approach to data handling</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>No fear-based or alarmist messaging</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Contextual, not absolute safety assessments</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                      <span>Special consideration for vulnerable populations</span>
                    </li>
                  </ul>
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