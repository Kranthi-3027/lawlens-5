# LawLens — AI Legal Assistant

Small, practical guide to run and deploy LawLens (a Vite + React app that calls a serverless API which uses Google Generative AI / Gemini).

## Quick summary
- Local dev: npm ci → npm run dev (http://localhost:5173)
- Build: npm run build
- Deploy: Vercel or Netlify (set env vars; add deployed domain to Firebase Authorized Domains)

## Prerequisites
- Node.js 18.x (LTS) or newer
- npm (or yarn/pnpm)
- A Google Generative AI / Gemini API key (kept server-side)

## Install & Run (local)
1. Clone the repo:
```powershell
git clone https://github.com/Kranthi-3027/lawlens-5.git
cd lawlens-5
```
2. Install dependencies (use `npm ci` for reproducible installs):
```powershell
npm ci
```
3. Create `.env` (copy from `.env.example`) and set the values below.
4. Start dev server:
```powershell
npm run dev
```
The app runs at `http://localhost:5173` by default.

### Recommended verification commands
```powershell
node -v
npm -v
git status --porcelain
ls -Name
```

## .env (example)
Create a `.env` in the project root (do NOT commit it):
```env
# Server-side API key (used by /api/chat.js)
API_KEY=your_google_gemini_api_key_here

# Firebase public config (frontend uses VITE_ prefixed vars)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Build for production
```powershell
npm run build
```

## Deployment

### Vercel
1. Push to GitHub.
2. Import the repo in Vercel and connect to the `main` branch.
3. Add environment variables in Vercel (Settings → Environment Variables):
   - `API_KEY` → Google Gemini API key (server only)
   - `VITE_FIREBASE_*` (all frontend Firebase values)
4. Deploy.
5. Add your Vercel deployment domain to Firebase Console → Authentication → Authorized domains.

Notes:
- Store `API_KEY` only in server/production environment (Vercel secret) so it never reaches the browser.
- Vercel automatically sets NODE_VERSION and common build settings; use `npm ci` in Build Commands if you need reproducible installs.

### Netlify
1. Push to GitHub.
2. Import the repo in Netlify.
3. Add the same environment variables in Netlify Site settings → Environment → Variables.
4. Deploy and add the Netlify domain to Firebase Authorized domains.

## Post-deploy checklist
- Confirm deployed site loads without console errors.
- Try sign-in flow and check Firebase Auth logs.
- Verify API requests from server are succeeding (server logs / function logs in Vercel/Netlify).

## Security notes
- The Gemini API key must remain on the server (in `API_KEY` environment variable). Do NOT expose this in client-side code.
- Firebase public config values (the VITE_ ones) are safe to include in the frontend bundle; they are not secrets.
- Keep `.env` in `.gitignore`.

## Tech stack
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Server: Vercel serverless functions (API in `/api/chat.js`)
- AI: Google Generative AI (Gemini)
- Auth/Storage: Firebase Authentication + Firestore

## Troubleshooting
- If build fails on CI, try `npm ci` locally and `npm run build` to reproduce errors.
- If auth fails after deployment, ensure the deployed domain is added to Firebase Authorized domains and that the VITE_FIREBASE_* values are correct.

## License
MIT
