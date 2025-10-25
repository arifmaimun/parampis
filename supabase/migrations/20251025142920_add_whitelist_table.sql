-- Create whitelisted_emails table
CREATE TABLE IF NOT EXISTS public.whitelisted_emails (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'superuser',
  added_by TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert email to whitelist
INSERT INTO public.whitelisted_emails (email, role, is_active, created_at, updated_at)
VALUES (
  'drh.muhammadarif@gmail.com',
  'superuser',
  true,
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;
