'use server'

import { createClient } from '@/lib/supabase/server'
import { uploadToGoogleDrive, createOrGetFolder } from '@/lib/google-drive'

export interface UploadResult {
  success: boolean
  fileId?: string
  fileUrl?: string
  fileName?: string
  error?: string
}

export async function uploadFile(formData: FormData): Promise<UploadResult> {
  try {
    const supabase = await createClient()
    
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: 'Not authenticated. Please sign in.' }
    }

    // Get session to access provider tokens
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Session not found.' }
    }

    // Get Google access token from session
    const googleToken = session.provider_token
    
    if (!googleToken) {
      return { 
        success: false, 
        error: 'No Google Drive access. Please sign in with Google and grant Drive permissions.' 
      }
    }

    const file = formData.get('file') as File
    
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Get folder ID from environment
    const baseFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    
    if (!baseFolderId) {
      return { 
        success: false, 
        error: 'Google Drive folder not configured. Please check environment variables.' 
      }
    }

    // Create or get subfolder for test uploads
    const testUploadFolderId = await createOrGetFolder(
      googleToken,
      baseFolderId,
      'Test Uploads'
    )

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    
    // Upload to Google Drive subfolder
    const result = await uploadToGoogleDrive(
      googleToken,
      buffer,
      fileName,
      file.type,
      testUploadFolderId
    )

    return { 
      success: true, 
      fileId: result.id, 
      fileUrl: result.webViewLink || undefined,
      fileName: result.name 
    }
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file'
    return { 
      success: false, 
      error: errorMessage
    }
  }
}
