'use client'

import { useState } from 'react'
import { uploadFile, UploadResult } from '@/app/actions/upload'

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<UploadResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      alert('Please select a file')
      return
    }

    setUploading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const result = await uploadFile(formData)
      setResult(result)
      
      if (result.success) {
        setFile(null)
      }
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Test Google Drive Upload</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a file to upload
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                aria-label="Select file to upload"
              />
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload to Google Drive'}
            </button>
          </form>

          {result && (
            <div className={`mt-4 p-4 rounded-md ${
              result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                result.success ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.success ? '✓ Upload Successful!' : '✗ Upload Failed'}
              </h3>
              
              {result.success ? (
                <div className="space-y-2 text-sm text-green-700">
                  <p><strong>File Name (Saved):</strong> {result.fileName}</p>
                  <p className="text-xs text-gray-600">
                    Original: {file?.name} → Renamed with timestamp prefix
                  </p>
                  <p><strong>File ID:</strong> {result.fileId}</p>
                  {result.fileUrl && (
                    <p>
                      <strong>View File:</strong>{' '}
                      <a 
                        href={result.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open in Google Drive
                      </a>
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-red-700">{result.error}</p>
              )}
            </div>
          )}

          <div className="mt-6 text-sm text-gray-500">
            <p><strong>Note:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Files will be uploaded to your Google Drive folder</li>
              <li>Make sure you&apos;re logged in with Google</li>
              <li>Check that GOOGLE_DRIVE_FOLDER_ID is set in .env.local</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
