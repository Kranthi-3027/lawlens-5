# Google Sign-In Troubleshooting Guide

If Google Sign-In is not working, follow these steps:

## 1. Check Firebase Console Settings

### Enable Google Sign-In Provider
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `lawlens-48357717-1993a`
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

### Allow Popups
- Make sure your browser allows popups for your site
- Check for a blocked popup icon in the address bar
- The app now has fallback redirect sign-in if popups are blocked

### Clear Cache
- Clear browser cache and cookies
- Try in an incognito/private window
- Try a different browser

### Check Browser Console
Open browser DevTools (F12) and check the Console tab for errors:
- Look for `auth/` error codes
- Common errors explained below

## 3. Common Firebase Auth Error Codes

| Error Code | Meaning | Solution |
|------------|---------|----------|
| `auth/popup-blocked` | Browser blocked the popup | Allow popups or use redirect method |
| `auth/popup-closed-by-user` | User closed popup before completing | Try again |
| `auth/unauthorized-domain` | Domain not authorized in Firebase | Add domain in Firebase Console |
| `auth/operation-not-allowed` | Google sign-in not enabled | Enable in Firebase Console |
| `auth/network-request-failed` | Network issue | Check internet connection |
| `auth/internal-error` | Firebase configuration issue | Check Firebase config values |

## 4. Local Development

For local development, make sure:
```bash
# Run the dev server
npm run dev

# It should run on http://localhost:5173
# Firebase should automatically allow localhost
```

## 5. Production Deployment

### For Vercel:
1. Deploy your app
2. Get your deployment URL (e.g., `lawlens-5.vercel.app`)
3. Add this URL to Firebase **Authorized domains**
4. Wait 1-2 minutes for Firebase to update
5. Test sign-in again

### For Netlify:
1. Deploy your app
2. Get your deployment URL (e.g., `lawlens-5.netlify.app`)
3. Add this URL to Firebase **Authorized domains**
4. Wait 1-2 minutes for Firebase to update
5. Test sign-in again

## 6. Debugging Steps

1. **Open browser console** (F12)
2. **Try to sign in**
3. **Check console logs** for:
   - "Error code: ..." 
   - "Error message: ..."
4. **Match error code** with table above
5. **Follow the solution**

## 7. Test the Sign-In Flow

The app now has better error handling:
- Tries popup sign-in first
- Falls back to redirect if popup is blocked
- Shows user-friendly error messages
- Logs detailed errors to console for debugging

## 8. Still Not Working?

If you've tried everything above and it still doesn't work:

1. **Share the error from console:**
   - Open F12 DevTools
   - Go to Console tab
   - Copy the error message and code
   
2. **Check Firebase project settings:**
   - Verify the `firebaseConfig` in `src/services/firebase.ts` matches your Firebase Console
   - Ensure API key, authDomain, and projectId are correct

3. **Check network requests:**
   - In DevTools, go to Network tab
   - Filter by "google" or "firebase"
   - Look for failed requests (red)
   - Check the response for error details

## Quick Checklist

- [ ] Google sign-in enabled in Firebase Console
- [ ] Deployed domain added to Authorized domains in Firebase
- [ ] Browser allows popups for your site
- [ ] No console errors in browser DevTools
- [ ] Firebase config in code matches Firebase Console
- [ ] Internet connection is working
- [ ] Tried in incognito/private window
- [ ] Cleared browser cache

---

**Need more help?** Check the browser console for specific error codes and refer to the error table above.
