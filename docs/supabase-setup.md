# Supabase Setup Guide

Panduan untuk setup Supabase CLI dan konfigurasi aplikasi.

## Prerequisites

1. Node.js (v18 atau lebih baru)
2. Supabase CLI
3. Account Supabase

## Installation

### 1. Install Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# atau menggunakan npm
npm install -g supabase
```

### 2. Login ke Supabase

```bash
supabase login
```

Login dengan akun Supabase Anda di browser yang terbuka.

### 3. Link Project

```bash
supabase link --project-ref anovzbbvasxsagkblbaf
```

Catatan: Project telah terlink dengan sukses!

### 4. Status Check

```bash
npm run supabase:status
```

## Environment Variables

Buat file `.env.local` di root project:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://anovzbbvasxsagkblbaf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database Configuration
DATABASE_URL=file:./prisma/dev.db
PROD_DATABASE_URL=postgresql://postgres.anovzbbvasxsagkblbaf@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

**Update:** File `.env.local` sudah ada dengan project ID lama. Silakan update ke project ID baru jika diperlukan.

### Mendapatkan API Keys

1. Buka [Supabase Dashboard](https://supabase.com/dashboard/project/anovzbbvasxsagkblbaf)
2. Go to **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

**Important:** Update `.env.local` dengan project ID yang benar: `anovzbbvasxsagkblbaf`

## File Structure

```
├── supabase/
│   ├── config.toml          # Supabase CLI configuration
│   ├── .gitignore          # Git ignore rules
│   └── .temp/              # Temporary files (auto-generated)
├── src/
│   └── lib/
│       └── supabase/
│           ├── client.ts    # Browser/client-side client
│           ├── server.ts    # Server-side client (Server Components)
│           └── middleware.ts # Middleware client
└── middleware.ts            # Next.js middleware for auth
```

## Usage

### Browser/Client Components

```typescript
import { createClient } from '@/lib/supabase/client'

export function Component() {
  const supabase = createClient()
  
  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }
  
  return <button onClick={handleSignIn}>Sign in</button>
}
```

### Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  return <div>User: {user?.email}</div>
}
```

### Server Actions

```typescript
'use server'

import { createClient } from '@/lib/supabase/server'

export async function serverAction() {
  const supabase = await createClient()
  const { data } = await supabase.from('table').select('*')
  return data
}
```

## Available Scripts

```bash
# Start local Supabase (development)
npm run supabase:start

# Stop local Supabase
npm run supabase:stop

# Check Supabase status
npm run supabase:status

# Push database changes
npm run supabase:db:push

# Reset database
npm run supabase:db:reset
```

## Database Management

### Sync Database Schema

```bash
# Pull remote schema to local
supabase db pull

# Push local schema to remote
supabase db push
```

### Generate Types

```bash
# Generate TypeScript types from Supabase schema
supabase gen types typescript --linked > src/types/supabase.ts
```

## Authentication Flow

### Google OAuth Setup

1. Go to Supabase Dashboard → **Authentication** → **Providers**
2. Enable **Google** provider
3. Add Google OAuth credentials:
   - **Client ID** dan **Client Secret** dari Google Cloud Console
4. Add authorized redirect URLs:
   - `https://anovzbbvasxsagkblbaf.supabase.co/auth/v1/callback`

### Test Authentication

```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
})
```

## Storage

### Upload File

```typescript
const { data, error } = await supabase.storage
  .from('bucket-name')
  .upload('path/to/file.jpg', file)

if (error) {
  console.error('Upload error:', error)
  return
}

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('bucket-name')
  .getPublicUrl('path/to/file.jpg')
```

## Troubleshooting

### Error: "Invalid API key"

**Problem**: Environment variables tidak terkonfigurasi dengan benar.

**Solution**: 
- Pastikan file `.env.local` sudah dibuat
- Restart development server setelah menambahkan env variables
- Check bahwa semua variables sudah terisi dengan benar

### Error: "Connection refused"

**Problem**: Supabase CLI belum running.

**Solution**: 
```bash
npm run supabase:start
```

### Error: "Unauthorized"

**Problem**: Session expired atau tidak terautentikasi.

**Solution**: 
- Sign out dan sign in kembali
- Check middleware configuration
- Verify session cookie settings

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
