# Supabase CLI - Setup Summary

## ✅ What Was Fixed

Supabase CLI setup telah diperbaiki dengan menambahkan konfigurasi lengkap untuk Next.js 15 dengan App Router.

## 📁 Files Created

### 1. Configuration Files
- ✅ `supabase/config.toml` - Supabase CLI configuration
- ✅ `supabase/.gitignore` - Git ignore rules for Supabase

### 2. Client Libraries
- ✅ `src/lib/supabase/client.ts` - Browser/client-side Supabase client
- ✅ `src/lib/supabase/server.ts` - Server-side Supabase client (Server Components)
- ✅ `src/lib/supabase/middleware.ts` - Middleware client for session management

### 3. Middleware
- ✅ `middleware.ts` - Next.js middleware for authentication session management

### 4. Documentation
- ✅ `docs/supabase-setup.md` - Complete setup guide
- ✅ `SUPABASE_SETUP.md` - This file

### 5. Package Scripts
- ✅ Updated `package.json` with Supabase CLI scripts

## 🚀 Quick Start

### 1. Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# or via npm
npm install -g supabase
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link Your Project

```bash
supabase link --project-ref anovzbbvasxsagkblbaf
```

### 4. Setup Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://anovzbbvasxsagkblbaf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

Get your keys from: https://supabase.com/dashboard/project/anovzbbvasxsagkblbaf/settings/api

### 5. Start Development

```bash
# Start Next.js dev server
npm run dev

# Check Supabase status (optional)
npm run supabase:status
```

## 📖 Usage Examples

### Client Component (Browser)

```tsx
'use client'

import { createClient } from '@/lib/supabase/client'

export function SignInButton() {
  const supabase = createClient()
  
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  
  return <button onClick={handleSignIn}>Sign In</button>
}
```

### Server Component

```tsx
import { createClient } from '@/lib/supabase/server'

export default async function Profile() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return <div>Welcome {user?.email}</div>
}
```

### Server Action

```tsx
'use server'

import { createClient } from '@/lib/supabase/server'

export async function getData() {
  const supabase = await createClient()
  const { data } = await supabase.from('your_table').select('*')
  return data
}
```

## 🔧 Available NPM Scripts

```bash
# Start local Supabase instance
npm run supabase:start

# Stop local Supabase instance
npm run supabase:stop

# Check Supabase status
npm run supabase:status

# Push database changes to Supabase
npm run supabase:db:push

# Reset local database
npm run supabase:db:reset
```

## 🎯 Features

- ✅ Server-side rendering support (Server Components)
- ✅ Client-side rendering support (Client Components)
- ✅ Server Actions support
- ✅ Automatic session management via middleware
- ✅ Cookie-based authentication
- ✅ TypeScript support
- ✅ Next.js 15 App Router compatible

## 🔐 Authentication Flow

1. User signs in via Supabase Auth (Google OAuth, Email, etc.)
2. Session is stored in HTTP-only cookies
3. Middleware automatically refreshes sessions
4. Server and Client Components can access user session
5. Protected routes are handled automatically

## 📚 More Information

For detailed documentation, see: [docs/supabase-setup.md](./docs/supabase-setup.md)

## 🔗 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase with Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

## ❓ Troubleshooting

If you encounter any issues, check:
1. Supabase CLI is installed and logged in
2. Environment variables are set correctly
3. Project is linked: `supabase link --project-ref anovzbbvasxsagkblbaf`
4. Database URL is correct in `.env.local`

For more help, see the troubleshooting section in `docs/supabase-setup.md`
