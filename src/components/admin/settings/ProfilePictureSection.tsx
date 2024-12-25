import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../common';
import { DeleteConfirmationModal } from '../modals';

const ProfilePictureSection = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // File validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('File must be JPG, PNG, or WebP');
      return;
    }

    try {
      setIsUploading(true);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // TODO: Implement actual upload logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6">
      <h2 className="text-lg font-medium text-white mb-4">Profile Picture</h2>
      
      <div className="space-y-4">
        {/* Current Picture / Preview */}
        {(preview || isUploading) && (
          <div className="relative w-48 h-48 mx-auto">
            {isUploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              <img
                src={preview!}
                alt="Profile preview"
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        )}

        {/* Upload Zone */}
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
          `}
        >
          <input {...getInputProps()} />
          <Upload className={`w-8 h-8 mb-4 ${isDragActive ? 'text-purple-400' : 'text-gray-400'}`} />
          <p className="text-sm text-gray-400 text-center">
            {isDragActive
              ? 'Drop the image here'
              : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            JPG, PNG, WebP (max. 5MB)
          </p>
        </div>

        {/* Actions */}
        {preview && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
            >
              Remove Picture
            </button>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setPreview(null);
          setIsDeleteModalOpen(false);
          toast.success('Profile picture removed');
        }}
        itemType="profile picture"
        itemTitle="current profile picture"
      />
    </div>
  );
};

export default ProfilePictureSection;