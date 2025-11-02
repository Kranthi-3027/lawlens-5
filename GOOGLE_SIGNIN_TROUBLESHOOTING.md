# Google Sign-In Troubleshooting Guide

If Google Sign-In is not working, follow these steps:

## 1. Check Firebase Console Settings

### Enable Google Sign-In Provider
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lawlens-6-61085567-b2538`
3. Go to **Authentication** → **Sign-in method**
4. Click on **Google** provider
5. Make sure it's **Enabled**
6. Add a support email if required

### Add Authorized Domains
1. In **Authentication** → **Settings** → **Authorized domains**
2. Make sure these domains are added:
   - `localhost` (for local development)
   - Your Vercel domain (e.g., `your-app.vercel.app`)
   - Your Netlify domain (e.g., `your-app.netlify.app`)
   - Any custom domains you're using

**Important:** Firebase automatically adds `localhost` and your Firebase hosting domain, but you must manually add Vercel/Netlify domains!

## 2. Browser Issues
# Google Sign-In Troubleshooting Guide

If Google Sign-In is not working, follow these steps to identify and fix the issue.

## 1 — Check Firebase Console settings

### Enable the Google provider
1. Open the Firebase Console: https://console.firebase.google.com/
2. Select the correct project (verify the project ID in your app's `src/services/firebase.ts`).
3. Go to **Authentication → Sign-in method**.
4. Click **Google** and make sure it's **Enabled**. Add a support email if required.

### Add authorized domains
1. In Firebase Console go to **Authentication → Settings → Authorized domains**.
2. Add the domains you use, for example:
   - `localhost` (for local dev)
   - `your-app.vercel.app` (Vercel)
   - `your-app.netlify.app` (Netlify)
   - Any custom domains you host on

Note: Firebase typically adds `localhost` automatically, but you must manually add hosted domains (Vercel/Netlify/custom).

## 2 — Browser issues

### Allow popups
- Ensure your browser allows popups for the site (popup-based OAuth is the default sign-in flow).
- If popups are blocked, the app will fall back to redirect sign-in in many cases.

### Clear cache / try other browsers
- Clear browser cache and cookies or use an Incognito/Private window.
- Try a different browser to rule out browser-specific extensions or settings.

### Inspect DevTools console
- Open DevTools (F12) and look for `auth/` error codes — they give precise causes.

## 3 — Common Firebase Auth error codes

| Error code | Meaning | Fix |
|---|---|---|
| `auth/popup-blocked` | Browser blocked the popup | Allow popups or use redirect flow |
| `auth/popup-closed-by-user` | User closed popup | Try again |
| `auth/unauthorized-domain` | Domain not in Firebase Authorized domains | Add domain in Firebase Console |
| `auth/operation-not-allowed` | Google provider disabled | Enable Google in Firebase Console |
| `auth/network-request-failed` | Network/connectivity issue | Check internet / retry |
| `auth/internal-error` | SDK/config issue | Check Firebase config values |

## 4 — Local development checklist
```powershell
# Run dev server
npm run dev
# App should run on http://localhost:5173
```

Make sure `localhost` is present in Firebase Authorized domains and that `src/services/firebase.ts` is using the expected environment variables (VITE_FIREBASE_*).

## 5 — Production deployment notes

For any deployed URL (Vercel, Netlify, etc.):
1. Deploy the app.
2. Copy the deployment URL (e.g., `lawlens-5.vercel.app`).
3. Add that URL to Firebase Console → Authentication → Authorized domains.
4. Wait ~1–2 minutes for Firebase to refresh and then test sign-in again.

## 6 — Debugging steps
1. Open DevTools → Console and Network tabs.
2. Try the sign-in flow and note any console errors (copy error code and message).
3. Inspect network requests to `google` or `firebase` for failed responses.
4. Cross-check the Firebase config in `src/services/firebase.ts` with the values in Firebase Console.

Example snippet (how the app should read env vars in `src/services/firebase.ts`):
```ts
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
```

## 7 — Sign-in flow behavior
- The app attempts popup sign-in first.
- If the popup is blocked or unavailable, it falls back to redirect sign-in.
- The UI surfaces friendly error messages; detailed errors appear in the console.

## 8 — If it's still not working
1. Copy the exact error code and message from DevTools Console.
2. Verify the `VITE_FIREBASE_*` values in your environment match the Firebase Console (API key, authDomain, projectId).
3. Check Network tab for failed requests and read the response body for clues.

## Quick checklist
- [ ] Google sign-in enabled in Firebase Console
- [ ] Deployed domain added to Firebase Authorized domains
- [ ] Browser allows popups or fallback redirect is working
- [ ] No auth-related console errors
- [ ] `src/services/firebase.ts` reads correct env vars
- [ ] Tested in Incognito/private window

---

If you still see an error, paste the exact console error code/message here and I will walk you through the fix.

