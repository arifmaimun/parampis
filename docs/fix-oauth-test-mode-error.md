# Fix: Access Denied - App Not Verified Error

## Problem
You're getting this error when trying to sign in:
```
Error 403: access_denied
anovzbbvasxsagkblbaf.supabase.co has not completed the Google verification process.
The app is currently being tested, and can only be accessed by developer-approved testers.
```

## Cause
Your OAuth app is in "Testing" mode and needs test users to be approved.

## Solution: Add Test Users

### Step-by-Step:

**1. Go to Google Cloud Console**
- Open: https://console.cloud.google.com/
- Select project: **parampis**

**2. Navigate to OAuth Consent Screen**
- Click on **APIs & Services** in left menu
- Click on **OAuth consent screen**

**3. Add Test Users**
- Scroll down to **Test users** section
- Click **+ ADD USERS**
- Add your email: `drh.muhammadarif@gmail.com`
- Add email of anyone else who will use the app
- Click **Add**

**4. Save**
- Scroll down
- Click **Save and Continue** or **Update**

**5. Retry Login**
- Go to http://localhost:3000/auth/signin
- Click "Sign In with Google"
- Should work now!

## Alternative: Publish App (Not Recommended for Dev)

If you want anyone to access it (not just test users):

1. Go to OAuth consent screen
2. Change **Publishing status** from "Testing" to "In production"
3. This requires Google verification (can take weeks)
4. Not recommended for development

## For Production Later

When you're ready to go live:
1. Complete OAuth verification process
2. Submit app for Google verification
3. Can take 4-6 weeks
4. Or keep in Testing mode with test users

## Quick Fix Summary

**What you need to do:**
1. ✅ Google Cloud Console → APIs & Services → OAuth consent screen
2. ✅ Scroll to "Test users"
3. ✅ Add: `drh.muhammadarif@gmail.com`
4. ✅ Click Add
5. ✅ Save
6. ✅ Retry login

## Important Notes

- In Testing mode, only approved test users can login
- Each user needs to be added manually
- No limit on number of test users
- Changes take effect immediately
- For development, Testing mode is perfect!
