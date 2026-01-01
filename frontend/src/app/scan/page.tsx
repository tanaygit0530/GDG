'use client';

import { useState, useRef, FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Scan, FileImage } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Reset previous results
      setResult(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Reset previous results
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file first');
      return;
    }
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/scan/ocr`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Product Ingredient Scanner
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of a food product label to analyze its ingredients
          </p>
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Product Label</CardTitle>
            <CardDescription>
              Take a clear photo of the ingredient list on the product packaging
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colors hover:border-blue-400"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                
                {previewUrl ? (
                  <div className="space-y-4">
                    <div className="mx-auto max-w-xs">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="rounded-lg max-h-64 mx-auto object-contain"
                      />
                    </div>
                    <p className="text-gray-600">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileImage className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your image here, or click to browse
                      </p>
                      <p className="text-gray-500 mt-1">
                        Supports JPG, PNG, WEBP up to 5MB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={!selectedFile || isUploading}
                  className="flex-1"
                >
                  {isUploading ? (
                    <>
                      <Scan className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="mr-2 h-4 w-4" />
                      Analyze Ingredients
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current.click();
                  }}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Select Another
                </Button>
              </div>
              
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {result && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>
                Ingredients found in the product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Extracted Text:</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{result.originalText.join(', ')}</p>
                  </div>
                </div>
                
                {result.ingredients.length > 0 ? (
                  <div>
                    <h3 className="font-medium mb-2">Identified Ingredients:</h3>
                    <div className="grid gap-4">
                      {result.ingredients.map((ingredient: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <h4 className="text-lg font-semibold">{ingredient.name}</h4>
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {ingredient.safetyScore}/10
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{ingredient.safetyExplanation}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {ingredient.aliases.map((alias: string, aliasIndex: number) => (
                              <span 
                                key={aliasIndex} 
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {alias}
                              </span>
                            ))}
                            {ingredient.eNumbers.map((eNum: string, eIndex: number) => (
                              <span 
                                key={eIndex} 
                                className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                              >
                                {eNum}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">
                      No known ingredients were identified in the product. 
                      The ingredients in the product may not be in our database.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="text-center text-sm text-gray-600 max-w-2xl mx-auto">
          <p className="mb-4">
            <strong>Privacy Notice:</strong> Images are processed temporarily and automatically deleted 
            after analysis. No images are stored on our servers.
          </p>
          <p>
            Information provided for educational purposes only. 
            Not intended as medical advice. Consult healthcare professionals for specific health concerns.
          </p>
        </div>
      </div>
    </div>
  );
}