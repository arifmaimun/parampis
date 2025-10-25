# Exact Path to Add Test Users

## Current Location
You're at: **OAuth Overview** page

## What You Need to Do

### Navigate to OAuth Consent Screen

**Option 1: Via Left Sidebar Menu**
1. Look at the **left sidebar**
2. Find **"APIs & Services"** 
3. Click on **"APIs & Services"**
4. In the dropdown or submenu, look for **"OAuth consent screen"**
5. Click on it

**Option 2: Via Search**
1. Look at the **search bar** at the top
2. Type: `OAuth consent screen`
3. Click on the result

**Option 3: Direct URL**
Copy and paste this in your browser:
```
https://console.cloud.google.com/apis/credentials/consent?project=parampis
```

## What You'll See

Once you're on OAuth Consent Screen, you'll see:
- Publishing status (Testing or In production)
- App information
- App domain
- **Test users** section ← This is what you need!

## Add Test User

1. Scroll down to **"Test users"** section
2. You'll see a list (might be empty)
3. Click **"+ ADD USERS"** button
4. A dialog will appear
5. Type: `drh.muhammadarif@gmail.com`
6. Click **"Add"**
7. You should see the email in the list
8. Scroll down and click **"SAVE AND CONTINUE"** or **"UPDATE"**

## Screenshot Reference

The page should look like this structure:

```
┌─────────────────────────────────────┐
│ OAuth consent screen                │
├─────────────────────────────────────┤
│ Publishing status: Testing          │
│                                     │
│ App name: Parampis                  │
│ ...                                 │
│                                     │
│ ▼ Test users                        │
│   drh.muhammadarif@gmail.com        │
│                                     │
│   [+ ADD USERS] ← Click here        │
│                                     │
│ [SAVE AND CONTINUE]                 │
└─────────────────────────────────────┘
```

## Still Can't Find It?

Try this:
1. Google Cloud Console homepage: https://console.cloud.google.com/
2. In the search bar at the top, type: `OAuth consent screen`
3. Click on the first result that shows "APIs & Services → OAuth consent screen"

## Alternative: Check Current Settings

If you want to see current OAuth settings:
1. Search for: `Credentials`
2. Click on "Credentials"
3. You'll see your OAuth 2.0 Client IDs
4. But to add test users, you need "OAuth consent screen" page

## After Adding

Once you've added the email and saved:
1. Wait 1 minute
2. Go back to: http://localhost:3000/auth/signin
3. Click "Sign In with Google"
4. Should work now!
