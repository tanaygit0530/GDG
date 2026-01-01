# Ingredient Transparency & Consumer Awareness Platform

## 🎯 Core Philosophy

This platform is:

- **Ingredient-first**, NOT product rating–based
- **Explainable**, NOT fear-based
- **Educational**, NOT medical
- **Contextual**, NOT one-size-fits-all

### ❌ What we avoid:
- "Good / bad" labels
- Panic colors (red/green warnings)
- Medical diagnosis
- Absolute bans

### ✅ What we provide:
- Clear explanations
- Transparency
- User empowerment

## 🧩 Problem Summary

Food labels use:
- Scientific names
- E-numbers
- Trade names
- Hidden sugars
- Ambiguous additives

Consumers (especially parents) cannot understand:
- What an ingredient actually is
- Where it comes from
- Why it is used
- Whether it is safe in context
- How the same ingredient appears under multiple names

Existing apps give product-level fear scores instead of ingredient literacy.

## 📁 Project Structure

```
GDGHACK/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── lib/
    ├── package.json
    └── tailwind.config.ts
```

## 🌐 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- ShadCN UI
- Tailwind CSS
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- Gemini API for OCR

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Gemini API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 🛠️ Features

### 1. Ingredient Search
- Search any ingredient by name, scientific name, E-number, or aliases
- Get detailed information about each ingredient
- Safety score with explanations

### 2. Product Scan (OCR)
- Upload photos of food product labels
- OCR extraction using Gemini API
- Privacy-compliant processing (images auto-deleted after processing)
- Ingredient analysis and context-aware information

### 3. Context-Aware Information
- Age-sensitive ingredient context (especially for children)
- Health-condition–aware context (diabetes, blood pressure, digestive sensitivity)
- Consumption frequency considerations

### 4. Educational Focus
- Clear explanations of ingredient purposes
- Origin information (plant-based, animal-based, synthetic)
- Alias mapping for hidden ingredients

## 🔍 API Endpoints

### Ingredients
- `GET /api/ingredients/:name` - Get detailed information about an ingredient
  - Query parameters:
    - `ageGroup`: child, adult, or elderly
    - `healthConditions`: diabetes, blood-pressure, digestive
    - `consumptionFrequency`: daily, weekly, occasional

### Scan
- `POST /api/scan/ocr` - Upload and analyze product image
  - Form data with `image` field

### Health
- `GET /api/health` - Health check endpoint

## 🧠 Key Differentiators

1. **Ingredient-first** (not product shaming)
2. **Alias detection** (hidden ingredients)
3. **Transparent scoring logic**
4. **India-relevant** (especially child nutrition)
5. **Education over fear**

## 🔐 Privacy & Ethics

### Image Processing
- Images are processed in memory or temporary storage only
- Auto-deleted immediately after OCR processing
- Never stored in database
- Never reused

### Data Handling
- No user data collection without consent
- Transparent data usage policies
- Respect for user privacy

### Ethical Boundaries
- Information provided for educational purposes only
- No medical advice or diagnosis
- No absolute bans or fear-based messaging
- Contextual, not absolute, safety scores

## 🏗️ Architecture

### Backend Architecture
- **Routes**: API endpoints
- **Controllers**: Request handling logic
- **Services**: Business logic and external API integration
- **Models**: Data structures
- **Middleware**: Authentication, validation, error handling
- **Data**: Ingredient database and utilities

### Frontend Architecture
- **App Router**: Page routing and layout
- **Components**: Reusable UI elements (ShadCN)
- **Lib**: Utility functions

## 🤖 OCR & AI Integration

### Gemini API Usage
- Used ONLY for OCR text extraction
- Used ONLY for ingredient name normalization
- NO black-box scoring
- NO AI-generated medical claims
- All safety scores are deterministic and explainable

## 📱 UI Components

- **Home Page**: Search and scan interface
- **Ingredient Detail Page**: Comprehensive ingredient information
- **Scan Page**: Product label upload and analysis
- **Context Selector**: Age and health condition preferences

## 🧪 Development

### Running in Development
- Backend: `npm run dev` in `/backend`
- Frontend: `npm run dev` in `/frontend`

### Building for Production
- Backend: `npm run build` in `/backend`
- Frontend: `npm run build` in `/frontend`

## 📋 Ethical Guidelines

### Non-Negotiable Principles
1. No fear-based messaging
2. No medical diagnosis
3. No absolute ingredient bans
4. Transparent scoring methodology
5. Educational focus over alarmism
6. Privacy-first approach

### Information Presentation
- Contextual safety scores (not absolute)
- Clear explanations of why ingredients are used
- Educational content about ingredient origins
- Age-appropriate considerations
- Health condition awareness (without medical advice)

### Data Ethics
- Images are processed temporarily and deleted immediately
- No personal data collection without explicit consent
- Transparent data usage policies
- Respect for user autonomy in food choices

## 🎯 Target Audience

- Health-conscious consumers
- Parents concerned about children's nutrition
- Individuals with specific dietary needs
- Anyone seeking to understand food ingredients

## 🚀 Future Extensions

- Cosmetics ingredient analysis
- Medicine ingredient analysis
- Multi-language support
- Mobile app development
- Offline capability
- Barcode scanning integration

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Note**: This platform provides information for educational purposes only and is not intended as medical advice. Consult healthcare professionals for specific health concerns.# GDG
