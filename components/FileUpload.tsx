'use client'

import { useState, useRef } from 'react'
import { Upload, X, Music, Image } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileUpload: (file: File) => Promise<string>
  type: 'audio' | 'image'
  accept: string
  maxSize?: number // in MB
}

export default function FileUpload({ 
  onFileSelect, 
  onFileUpload, 
  type, 
  accept, 
  maxSize = 10 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFile = async (file: File) => {
    setError(null)
    
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return
    }

    // Validate file type
    if (!accept.split(',').some(acceptedType => file.type.match(acceptedType.replace('*', '.*')))) {
      setError(`Please select a valid ${type} file`)
      return
    }

    onFileSelect(file)
    
    try {
      setUploading(true)
      const url = await onFileUpload(file)
      setUploadedUrl(url)
    } catch (err) {
      setError('Upload failed. Please try again.')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const clearFile = () => {
    setUploadedUrl(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 kcs:bg-kcs-900/20' 
            : 'border-gray-300 dark:border-gray-600 kcs:border-kcs-700 hover:border-primary-400 dark:hover:border-primary-500 kcs:hover:border-kcs-500'
          }
          ${uploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {uploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-primary-100 dark:bg-primary-900 kcs:bg-kcs-900 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 kcs:text-kcs-400">
                Uploading...
              </p>
            </motion.div>
          ) : uploadedUrl ? (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-green-100 dark:bg-green-900 kcs:bg-green-900 rounded-full flex items-center justify-center">
                {type === 'audio' ? (
                  <Music className="w-6 h-6 text-green-600 dark:text-green-400 kcs:text-green-400" />
                ) : (
                  <Image className="w-6 h-6 text-green-600 dark:text-green-400 kcs:text-green-400" />
                )}
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 kcs:text-green-400 font-medium">
                File uploaded successfully!
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  clearFile()
                }}
                className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 kcs:hover:text-kcs-300"
              >
                Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className="w-12 h-12 mx-auto bg-gray-100 dark:bg-gray-800 kcs:bg-kcs-800 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-600 dark:text-gray-400 kcs:text-kcs-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white kcs:text-kcs-100">
                  {isDragging ? 'Drop your file here' : `Click to upload ${type} file`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 kcs:text-kcs-500 mt-1">
                  {type === 'audio' 
                    ? 'MP3, WAV, OGG up to 10MB' 
                    : 'JPG, PNG, WEBP up to 10MB'
                  }
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 kcs:bg-red-900/20 border border-red-200 dark:border-red-800 kcs:border-red-800 rounded text-sm text-red-600 dark:text-red-400 kcs:text-red-400"
        >
          {error}
        </motion.div>
      )}

      {uploadedUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 kcs:bg-green-900/20 border border-green-200 dark:border-green-800 kcs:border-green-800 rounded text-sm text-green-600 dark:text-green-400 kcs:text-green-400"
        >
          <p className="font-medium">File URL:</p>
          <p className="text-xs break-all">{uploadedUrl}</p>
        </motion.div>
      )}
    </div>
  )
}

