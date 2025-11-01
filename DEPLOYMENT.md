# LawLens - AI Legal Assistant

An AI-powered legal document analysis tool using Google's Gemini AI.

## Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Generative AI API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kranthi-3027/lawlens-5.git
cd lawlens-5
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory (for local development):
```env
API_KEY=your_google_gemini_api_key_here
```

**IMPORTANT:** Never commit your `.env` file to git!

### Local Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variable in Vercel dashboard:
   - Key: `API_KEY`
   - Value: Your Google Gemini API key
4. Deploy!

**Important:** The API key is stored securely on the server (in `/api/chat.js`) and is never exposed to the client.

### Netlify Deployment

1. Push your code to GitHub
2. Import the project in Netlify
3. Add environment variable in Netlify dashboard:
   - Key: `API_KEY` 
   - Value: Your Google Gemini API key
4. Deploy!

## Security

- ✅ API keys are kept server-side in serverless functions
- ✅ No secrets are bundled in the frontend code
- ✅ `.env` files are gitignored
- ✅ CORS is properly configured

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend:** Vercel Serverless Functions
- **AI:** Google Generative AI (Gemini)
- **Auth:** Firebase Authentication
- **Storage:** Firebase Firestore

## License

MIT
