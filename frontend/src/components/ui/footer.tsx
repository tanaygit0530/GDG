import { Shield, Heart, Info, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">IngredientAware</h3>
            <p className="text-sm text-gray-600">
              Educational platform for understanding food ingredients in context.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-500" />
              Information
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-blue-600">About Us</a></li>
              <li><a href="/transparency" className="hover:text-blue-600">Transparency</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              Policies
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">Educational Disclaimer</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 flex items-center">
              <Heart className="h-4 w-4 mr-2 text-red-500" />
              Educational Focus
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Contextual ingredient education</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>No fear-based ratings</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Child-focused awareness</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>© {new Date().getFullYear()} IngredientAware. Built for awareness, not fear.</p>
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 mr-2 text-green-500" />
              <p>Privacy-first OCR: Images auto-deleted after processing</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              Information provided for educational purposes only. Not intended as medical advice. 
              Consult healthcare professionals for specific health concerns.
            </p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">
              GDG Hackathon Project - Focused on ingredient transparency and consumer education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}