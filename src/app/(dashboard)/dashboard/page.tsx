import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Get the session to access provider tokens
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🐾 Parampis Dashboard
          </h1>
          <p className="text-gray-600">Welcome, {user.email}</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> Superuser</p>
            <p><strong>Status:</strong> <span className="text-green-600">Authenticated</span></p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Files Card */}
          <Link 
            href="/files"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">📁</div>
            <h3 className="text-lg font-semibold mb-2">Files</h3>
            <p className="text-sm text-gray-600">
              View and manage files in Google Drive
            </p>
          </Link>

          {/* Test Upload Card */}
          <Link 
            href="/test-upload"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-3">📤</div>
            <h3 className="text-lg font-semibold mb-2">Upload File</h3>
            <p className="text-sm text-gray-600">
              Upload new files to Google Drive
            </p>
          </Link>

          {/* Patients Card */}
          <div className="bg-white rounded-xl shadow-md p-6 opacity-50">
            <div className="text-4xl mb-3">🐾</div>
            <h3 className="text-lg font-semibold mb-2">Patients</h3>
            <p className="text-sm text-gray-600">
              Manage patient records (Coming Soon)
            </p>
          </div>
        </div>

        {/* Session Info */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Session Information</h3>
          <div className="text-sm space-y-2">
            <p><strong>Access Token:</strong> {session?.provider_token ? '✅ Available' : '❌ Not available'}</p>
            <p><strong>Refresh Token:</strong> {session?.provider_refresh_token ? '✅ Available' : '❌ Not available'}</p>
            <p className="text-gray-500 mt-4">
              {session?.provider_token 
                ? '✅ You can upload files to Google Drive' 
                : '⚠️ Google Drive access not granted. Please sign in again with Drive permissions.'}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
