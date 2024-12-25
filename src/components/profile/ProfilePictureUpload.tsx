import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import { LoadingSpinner } from '../admin';

export const ProfilePictureUpload = () => {
  const { uploadPicture, deletePicture, isLoading } = useProfilePicture();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    await uploadPicture(file);
  }, [uploadPicture]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif']
    },
    maxFiles: 1,
    disabled: isLoading
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          transition-colors cursor-pointer
          ${isDragActive ? 'border-purple-500 bg-purple-500/10' : 'border-gray-700'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500/50'}
        `}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <LoadingSpinner size="lg" />
        ) : (
          <>
            <Upload className="w-8 h-8 mb-4 text-gray-400" />
            <p className="text-sm text-gray-400 text-center">
              {isDragActive ? 'Drop the image here' : 'Drag & drop or click to select'}
            </p>
            <p className="text-xs text-gray-500 mt-2">JPG, PNG, GIF (max. 50MB)</p>
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