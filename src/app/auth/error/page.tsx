'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('message') || 'Authentication failed'
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="mt-4 text-gray-600">
            {errorMessage}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Your email address may not be authorized to access this application.
          </p>
        </div>

        <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-red-800 mb-2">Possible reasons:</h3>
          <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
            <li>Your email is not in the whitelist</li>
            <li>You declined to grant Google Drive access</li>
            <li>You chose the wrong Google account</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/auth/signin')}
            className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Home
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-xs text-gray-500">
            Need help? Contact the administrator to request access.
          </p>
        </div>
      </div>
    </div>
  )
}
