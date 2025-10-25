# Fix: redirect_uri_mismatch Error

## Problem
You're getting this error when trying to sign in with Google:
```
Error 400: redirect_uri_mismatch
Access blocked: Parampis's request is invalid
```

## Cause
The redirect URL `http://localhost:3000/auth/callback` is not registered in Google Cloud Console.

## Solution: Add Redirect URI to Google Cloud Console

### Step-by-Step:

**1. Go to Google Cloud Console**
- Open: https://console.cloud.google.com/
- Select project: **parampis**

**2. Navigate to Credentials**
- Click on **APIs & Services** in left menu
- Click on **Credentials**
- Find your OAuth 2.0 Client ID (the one starting with `243414505863...`)
- Click on the **pencil icon** (Edit) or click on the credential name

**3. Add Redirect URIs**
- Scroll down to **Authorized redirect URIs** section
- Click **+ ADD URI**
- Add these two URIs (one at a time):
  ```
  http://localhost:3000/auth/callback
  ```
  ```
  https://anovzbbvasxsagkblbaf.supabase.co/auth/v1/callback
  ```

**4. Save**
- Click **Save** at the bottom

**5. Wait & Retry**
- Wait 1-2 minutes for changes to propagate
- Try signing in again at http://localhost:3000/auth/signin

## Alternative: Quick Add via Supabase

Some Supabase projects automatically configure redirect URIs. If the above doesn't work:

1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add to Redirect URLs:
   - `http://localhost:3000/auth/callback`
4. Save

## Verify It's Fixed

After adding the redirect URIs:

1. ✅ Go to http://localhost:3000
2. ✅ Click "Sign In with Google"
3. ✅ Should redirect to Google login (not error page)
4. ✅ After login, should redirect back to dashboard

## Important Notes

- The redirect URI must match **exactly** (including `http://` vs `https://` and no trailing slash)
- Changes can take 1-2 minutes to propagate
- Always use `http://localhost:3000` for development
- For production, you'll need to add your production domain

## Still Having Issues?

1. **Clear browser cache** - Old redirect URIs might be cached
2. **Use incognito window** - Test in a fresh session
3. **Check browser console** - Look for any additional error messages
4. **Verify in Google Console** - Make sure both URIs are listed
