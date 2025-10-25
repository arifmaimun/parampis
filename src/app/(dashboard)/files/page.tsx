'use client'

import { useState, useEffect } from 'react'
import { listFiles, renameFile, openFolder, FileListResult } from '@/app/actions/files'
import Link from 'next/link'

interface FolderPath {
  id: string
  name: string
}

export default function FilesPage() {
  const [files, setFiles] = useState<FileListResult['files']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<{id: string, name: string, loadTime?: number} | null>(null)
  const [renamingFile, setRenamingFile] = useState<string | null>(null)
  const [newFileName, setNewFileName] = useState('')
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)
  const [folderPath, setFolderPath] = useState<FolderPath[]>([])

  useEffect(() => {
    loadFiles()
  }, [])

  const loadFiles = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await listFiles()
      
      if (result.success && result.files) {
        setFiles(result.files)
      } else {
        setError(result.error || 'Failed to load files')
      }
    } catch (err) {
      setError('Failed to load files. Please try again.')
      console.error('Load files error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes?: string) => {
    if (!bytes) return 'Unknown size'
    const size = parseInt(bytes)
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
  }

  const handleRename = async (fileId: string, currentName: string) => {
    setRenamingFile(fileId)
    setNewFileName(currentName)
  }

  const confirmRename = async (fileId: string) => {
    if (!newFileName.trim()) {
      alert('File name cannot be empty')
      return
    }

    try {
      const result = await renameFile(fileId, newFileName.trim())
      if (result.success) {
        // Refresh file list
        await loadFiles()
        setRenamingFile(null)
        setNewFileName('')
      } else {
        alert(result.error || 'Failed to rename file')
      }
    } catch (error) {
      console.error('Rename error:', error)
      alert('Failed to rename file')
    }
  }

  const cancelRename = () => {
    setRenamingFile(null)
    setNewFileName('')
  }

  const handleFolderClick = async (folderId: string, folderName: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await openFolder(folderId)
      
      if (result.success && result.files) {
        setFiles(result.files)
        setCurrentFolderId(folderId)
        // Add current folder to breadcrumb
        setFolderPath(prev => [...prev, { id: folderId, name: folderName }])
      } else {
        setError(result.error || 'Failed to open folder')
      }
    } catch (err) {
      setError('Failed to open folder. Please try again.')
      console.error('Open folder error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBreadcrumbClick = async (folderId: string, index: number) => {
    // Navigate back to folder at index
    setLoading(true)
    setError(null)
    
    try {
      const result = await openFolder(folderId)
      
      if (result.success && result.files) {
        setFiles(result.files)
        setCurrentFolderId(folderId)
        // Update breadcrumb up to this folder
        setFolderPath(folderPath.slice(0, index + 1))
      } else {
        setError(result.error || 'Failed to navigate to folder')
      }
    } catch (err) {
      setError('Failed to navigate to folder. Please try again.')
      console.error('Navigate error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToRoot = async () => {
    setLoading(true)
    setError(null)
    setCurrentFolderId(null)
    setFolderPath([])
    await loadFiles()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📁 Files</h1>
            <p className="text-gray-600 mt-1">Files stored in Google Drive</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={loadFiles}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <Link
              href="/test-upload"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Upload New File
            </Link>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <>
            {/* Skeleton Loading */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-48"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">Fetching files from Google Drive...</p>
            </div>
          </>
        )}

        {/* Files List */}
        {!loading && !error && (
          <>
            {/* Breadcrumb Navigation */}
            {(folderPath.length > 0 || currentFolderId) && (
              <div className="mb-4 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <button
                    onClick={handleBackToRoot}
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    📁 Root
                  </button>
                  {folderPath.map((folder, index) => (
                    <span key={folder.id}>
                      <span className="text-gray-400 mx-2">/</span>
                      <button
                        onClick={() => handleBreadcrumbClick(folder.id, index)}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        📁 {folder.name}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {files && files.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preview
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {files.map((file) => (
                                             <tr key={file.id} className="hover:bg-gray-50">
                         {/* Preview Column */}
                         <td className="px-2 py-2 whitespace-nowrap">
                           {file.mimeType?.startsWith('image/') ? (
                             <div className="w-16 h-16 border border-gray-200 rounded overflow-hidden bg-gray-50 relative">
                               {selectedImage && selectedImage.id === file.id ? (
                                 // Show revealed image with close button
                                 <div 
                                   className="w-full h-full relative cursor-pointer"
                                   onClick={(e) => {
                                     e.stopPropagation()
                                     setSelectedImage(null)
                                   }}
                                   title="Click anywhere to close"
                                 >
                                   <img 
                                     src={`/api/drive-image/${file.id}?t=${selectedImage.loadTime || Date.now()}`}
                                     alt={file.name}
                                     className="w-full h-full object-cover pointer-events-none"
                                     draggable="false"
                                     key={selectedImage.loadTime || Date.now()}
                                   />
                                   <button
                                     onClick={(e) => {
                                       e.preventDefault()
                                       e.stopPropagation()
                                       setSelectedImage(null)
                                     }}
                                     className="absolute top-0 right-0 bg-red-600 text-white text-sm font-bold w-5 h-5 rounded-full hover:bg-red-700 flex items-center justify-center z-[100] shadow-lg border-2 border-white"
                                     title="Close preview"
                                     style={{ pointerEvents: 'auto', lineHeight: '1' }}
                                   >
                                     ✕
                                   </button>
                                 </div>
                               ) : (
                                 // Show spoiler button
                                 <button
                                   onClick={() => {
                                     setSelectedImage({id: file.id, name: file.name, loadTime: Date.now()})
                                   }}
                                   className="w-full h-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400"
                                   title="Click to reveal image"
                                 >
                                   <span className="text-xs text-gray-600 font-medium">👁️ Click to reveal</span>
                                 </button>
                               )}
                             </div>
                           ) : (
                             <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                               <span className="text-lg">📄</span>
                             </div>
                           )}
                         </td>
                         {/* Name Column */}
                         <td className="px-6 py-4">
                           <div className="flex items-center gap-2">
                             {renamingFile === file.id ? (
                               <div className="flex items-center gap-2 flex-1">
                                 <input
                                   type="text"
                                   value={newFileName}
                                   onChange={(e) => setNewFileName(e.target.value)}
                                   onKeyDown={(e) => {
                                     if (e.key === 'Enter') confirmRename(file.id)
                                     if (e.key === 'Escape') cancelRename()
                                   }}
                                   className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="Enter new file name"
                                   aria-label="New file name"
                                   autoFocus
                                 />
                                 <button
                                   onClick={() => confirmRename(file.id)}
                                   className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                 >
                                   ✓
                                 </button>
                                 <button
                                   onClick={cancelRename}
                                   className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                                 >
                                   ✕
                                 </button>
                               </div>
                             ) : (
                               <>
                                 <span className="text-sm font-medium text-gray-900">{file.name}</span>
                                 <button
                                   onClick={() => handleRename(file.id, file.name)}
                                   className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                                   title="Rename file"
                                 >
                                   ✏️
                                 </button>
                               </>
                             )}
                           </div>
                         </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {file.mimeType || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">{formatFileSize(file.size)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            {file.mimeType === 'application/vnd.google-apps.folder' ? (
                              <button
                                onClick={() => handleFolderClick(file.id, file.name)}
                                className="text-blue-600 hover:text-blue-900 hover:underline"
                              >
                                Open Folder
                              </button>
                            ) : (
                              file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Open
                                </a>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">No files found</p>
                <p className="text-gray-400 mt-2">Upload your first file to get started</p>
                <Link
                  href="/test-upload"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upload File
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
