'use server'

import { createClient } from '@/lib/supabase/server'
import { listFilesFromGoogleDrive } from '@/lib/google-drive'

export interface FileListResult {
  success: boolean
  files?: Array<{
    id: string
    name: string
    webViewLink?: string
    mimeType?: string
    size?: string
    thumbnailLink?: string // Added thumbnailLink
  }>
  error?: string
}

export interface RenameFileResult {
  success: boolean
  error?: string
}

export async function listFiles(): Promise<FileListResult> {
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

    // Get folder ID from environment
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
    
    if (!folderId) {
      return { 
        success: false, 
        error: 'Google Drive folder not configured. Please check environment variables.' 
      }
    }

    // List files from Google Drive
    // Limit to 50 files for faster loading
    const allFiles = await listFilesFromGoogleDrive(googleToken, folderId)
    const files = allFiles.slice(0, 50)

    return { 
      success: true, 
      files: files.map((file) => ({
        id: file.id,
        name: file.name,
        webViewLink: file.webViewLink,
        mimeType: file.mimeType,
        size: file.size,
        thumbnailLink: file.thumbnailLink, // Mapped thumbnailLink
      }))
    }
  } catch (error: unknown) {
    console.error('List files error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to list files'
    return { 
      success: false, 
      error: errorMessage
    }
  }
}

export async function openFolder(folderId: string): Promise<FileListResult> {
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

    // List files from the selected folder
    const allFiles = await listFilesFromGoogleDrive(googleToken, folderId)
    const files = allFiles.slice(0, 50)

    return { 
      success: true, 
      files: files.map((file) => ({
        id: file.id,
        name: file.name,
        webViewLink: file.webViewLink,
        mimeType: file.mimeType,
        size: file.size,
        thumbnailLink: file.thumbnailLink,
      }))
    }
  } catch (error: unknown) {
    console.error('Open folder error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to open folder'
    return { 
      success: false, 
      error: errorMessage
    }
  }
}

export async function renameFile(fileId: string, newName: string): Promise<RenameFileResult> {
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

    if (!session || !session.provider_token) {
      return { success: false, error: 'No Google Drive access' }
    }

    // Rename file in Google Drive
    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return { 
        success: false, 
        error: errorData.error?.message || 'Failed to rename file' 
      }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error('Rename file error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to rename file'
    return { 
      success: false, 
      error: errorMessage
    }
  }
}
