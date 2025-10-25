import { google } from 'googleapis'
import { Readable } from 'stream'

export interface GoogleDriveFile {
  id: string
  name: string
  webViewLink?: string
  webContentLink?: string
  mimeType?: string
  size?: string
  thumbnailLink?: string
}

/**
 * Upload file to Google Drive
 */
export async function uploadToGoogleDrive(
  accessToken: string,
  file: Buffer,
  fileName: string,
  mimeType: string,
  folderId: string
): Promise<GoogleDriveFile> {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })

  // Convert Buffer to stream for googleapis
  const bufferStream = new Readable()
  bufferStream.push(file)
  bufferStream.push(null)

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: bufferStream,
    },
    fields: 'id,name,webViewLink,webContentLink,mimeType,size,thumbnailLink',
  })

  const data = response.data

  return {
    id: data.id || '',
    name: data.name || '',
    webViewLink: data.webViewLink === null ? undefined : data.webViewLink,
    webContentLink: data.webContentLink === null ? undefined : data.webContentLink,
    mimeType: data.mimeType === null ? undefined : data.mimeType,
    size: data.size === null ? undefined : data.size,
    thumbnailLink: data.thumbnailLink === null ? undefined : data.thumbnailLink,
  }
}

/**
 * List files from Google Drive folder
 */
export async function listFilesFromGoogleDrive(
  accessToken: string,
  folderId: string
): Promise<GoogleDriveFile[]> {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })

  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed=false`,
    fields: 'files(id,name,webViewLink,webContentLink,mimeType,size,thumbnailLink)',
    orderBy: 'createdTime desc',
    pageSize: 50,
  })

  const files = response.data.files || []

  return files.map((file) => ({
    id: file.id || '',
    name: file.name || '',
    webViewLink: file.webViewLink === null ? undefined : file.webViewLink,
    webContentLink: file.webContentLink === null ? undefined : file.webContentLink,
    mimeType: file.mimeType === null ? undefined : file.mimeType,
    size: file.size === null ? undefined : file.size,
    thumbnailLink: file.thumbnailLink === null ? undefined : file.thumbnailLink,
  }))
}

/**
 * Delete file from Google Drive
 */
export async function deleteFromGoogleDrive(
  accessToken: string,
  fileId: string
): Promise<void> {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })
  
  await drive.files.delete({ fileId })
}

/**
 * Create or get folder in Google Drive
 */
export async function createOrGetFolder(
  accessToken: string,
  parentFolderId: string,
  folderName: string
): Promise<string> {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })

  // Check if folder already exists
  const listResponse = await drive.files.list({
    q: `'${parentFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
  })

  // If folder exists, return its ID
  if (listResponse.data.files && listResponse.data.files.length > 0) {
    return listResponse.data.files[0].id || ''
  }

  // Create new folder
  const createResponse = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    },
    fields: 'id',
  })

  return createResponse.data.id || ''
}

/**
 * Get file info from Google Drive
 */
export async function getGoogleDriveFile(
  accessToken: string,
  fileId: string
): Promise<GoogleDriveFile> {
  const oauth2Client = new google.auth.OAuth2()
  oauth2Client.setCredentials({ access_token: accessToken })

  const drive = google.drive({ version: 'v3', auth: oauth2Client })
  
  const response = await drive.files.get({
    fileId,
    fields: 'id,name,mimeType,size,webViewLink,webContentLink,thumbnailLink',
  })

  const data = response.data

  return {
    id: data.id || '',
    name: data.name || '',
    webViewLink: data.webViewLink === null ? undefined : data.webViewLink,
    webContentLink: data.webContentLink === null ? undefined : data.webContentLink,
    mimeType: data.mimeType === null ? undefined : data.mimeType,
    size: data.size === null ? undefined : data.size,
    thumbnailLink: data.thumbnailLink === null ? undefined : data.thumbnailLink,
  }
}

/**
 * Get thumbnail URL for an image file
 */
export function getThumbnailUrl(fileId: string, width: number = 100): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${width}`
}

/**
 * Get alternative thumbnail URL
 */
export function getAlternateThumbnailUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}
