import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle error from OAuth provider
  if (error) {
    console.error('OAuth error:', error, errorDescription)
    return NextResponse.redirect(new URL('/auth/error?message=' + encodeURIComponent(errorDescription || error), requestUrl.origin))
  }

  // Handle code exchange
  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    
    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      return NextResponse.redirect(new URL('/auth/error?message=' + encodeURIComponent(exchangeError.message), requestUrl.origin))
    }
  }

  // Redirect to dashboard after successful authentication
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}
