# Testing Google Authentication - Step by Step Guide

## ✅ What You Just Did

You successfully enabled Google authentication in Supabase Dashboard:
- Provider: Google ✅ Enabled
- Client ID: Configured ✅
- Client Secret: Configured ✅

## 🔧 Next: Configure Redirect URLs

**IMPORTANT**: You need to add the redirect URL for your app!

1. In the same Google provider configuration page, find **"Redirect URLs"** section
2. Add this URL:
   ```
   http://localhost:3000/auth/callback
   ```
3. Click **Save**

### Alternative: Add in Google Cloud Console

If the Supabase dashboard doesn't have redirect URL field, add it in Google Cloud Console:

1. Go to: https://console.cloud.google.com/
2. Select project: **parampis**
3. Navigate to: **APIs & Services** → **Credentials**
4. Click on your OAuth 2.0 Client ID
5. Under **Authorized redirect URIs**, add:
   - `http://localhost:3000/auth/callback`
   - `https://anovzbbvasxsagkblbaf.supabase.co/auth/v1/callback` (Supabase callback)

## 🧪 Testing Steps

### 1. Start Dev Server (if not running)
```bash
npm run dev
```

### 2. Open Browser
- Go to: http://localhost:3000
- Click: **"Sign In with Google"**

### 3. Login Process
1. You'll be redirected to Google sign-in page
2. Select or enter: `drh.muhammadarif@gmail.com`
3. Click **Allow** to grant Drive permissions
4. You'll be redirected back to `/dashboard`

### 4. Verify Success
Check these in the dashboard:
- ✅ Email displayed: `drh.muhammadarif@gmail.com`
- ✅ Access Token: ✅ Available
- ✅ Status: Authenticated

### 5. Test File Upload
1. Click on **"Test File Upload"** card
2. Select a file (image or document)
3. Click **"Upload to Google Drive"**
4. Wait for success message
5. Click **"Open in Google Drive"** to verify file

## 📋 Verification Checklist

- [ ] Google provider enabled in Supabase
- [ ] Redirect URL added: `http://localhost:3000/auth/callback`
- [ ] Dev server running
- [ ] Can access `/auth/signin` page
- [ ] Google login works
- [ ] Redirects to dashboard after login
- [ ] Session shows access token
- [ ] File upload works

## 🐛 Common Issues

### Issue: "Provider not enabled"
- **Solution**: Enable Google provider in Supabase Dashboard → Authentication → Providers

### Issue: "Redirect URI mismatch"
- **Solution**: Add `http://localhost:3000/auth/callback` to authorized redirect URIs in Google Cloud Console

### Issue: "Access denied"
- **Solution**: Make sure email `drh.muhammadarif@gmail.com` is in whitelisted_emails table

### Issue: "No Google Drive access token"
- **Solution**: Make sure to grant Drive permissions when signing in. Click "Allow" for all requested permissions.

## 📊 Expected Flow

```
User clicks "Sign In with Google"
    ↓
Redirect to Google OAuth
    ↓
Select account: drh.muhammadarif@gmail.com
    ↓
Grant Drive permission
    ↓
Google redirects to Supabase callback
    ↓
Supabase validates & creates session
    ↓
Redirect to /auth/callback
    ↓
Exchange code for session
    ↓
Redirect to /dashboard
    ↓
Dashboard displays user info
```

## 🎉 Success Indicators

When everything works correctly:
1. ✅ No errors in browser console
2. ✅ No errors in terminal (where dev server is running)
3. ✅ Dashboard shows your email
4. ✅ Access token is available in session
5. ✅ Test upload page works
6. ✅ File appears in Google Drive folder

## 📞 Next Steps After Successful Auth

Once authentication is working:
1. Test file upload functionality
2. Test logout and re-login
3. Continue with Phase 2 features (Dashboard, Client Management, etc.)

---

**Need Help?**
- Check browser console for errors (F12 → Console)
- Check terminal for server logs
- Verify all environment variables are set
- Make sure Supabase project is active
