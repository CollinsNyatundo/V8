```tsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import { LoadingSpinner } from '../admin';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
};

export const ImageUpload = () => {
  const { uploadPicture, deletePicture, isLoading } = useProfilePicture();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size must be less than 50MB');
      return;
    }

    try {
      await uploadPicture(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  }, [uploadPicture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          transition-colors cursor-pointer
          ${isDragActive
            ? 'border-purple-500/50 bg-purple-500/10'
            : 'border-gray-700 hover:border-purple-500/30 hover:bg-purple-500/5'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} disabled={isLoading} />
        {isLoading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <>
            <Upload className={`w-8 h-8 mb-4 ${isDragActive ? 'text-purple-400' : 'text-gray-400'}`} />
            <p className="text-sm text-gray-400 text-center">
              {isDragActive
                ? 'Drop the image here'
                : 'Drag & drop an image here, or click to select'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG, GIF (max. 50MB)
            </p>
          </>
        )}
      </div>

      <button
        onClick={deletePicture}
        disabled={isLoading}
        className="w-full px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Remove Picture
      </button>
    </div>
  );
};