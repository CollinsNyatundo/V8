import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export const useProfileStorage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 50MB');
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('File must be JPG, PNG, or GIF');
    }
  };

  const uploadFile = async (file: File) => {
    if (!user?.email) throw new Error('User not authenticated');

    validateFile(file);
    setIsUploading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${user.email}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (url: string) => {
    if (!user?.email) throw new Error('User not authenticated');

    const filePath = url.split('/').pop();
    if (!filePath) throw new Error('Invalid file URL');

    const { error } = await supabase.storage
      .from('profile-pictures')
      .remove([`${user.email}/${filePath}`]);

    if (error) throw error;
  };

  return {
    uploadFile,
    deleteFile,
    isUploading
  };
};