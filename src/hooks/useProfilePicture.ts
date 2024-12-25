import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const useProfilePicture = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrCreateProfile = async () => {
      if (!user?.email) return;

      try {
        setIsLoading(true);
        
        // Try to get existing profile
        let { data: profile } = await supabase
          .from('profiles')
          .select('avatar_url')
          .eq('email', user.email)
          .single();

        // If no profile exists, create one
        if (!profile) {
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert({ email: user.email })
            .select()
            .single();

          if (insertError) throw insertError;
          profile = newProfile;
        }

        if (profile?.avatar_url) {
          setImageUrl(profile.avatar_url);
        }
      } catch (err) {
        console.error('Error fetching/creating profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrCreateProfile();
  }, [user?.email]);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 50MB');
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      throw new Error('File must be JPG, PNG, or GIF');
    }
  };

  const uploadPicture = async (file: File) => {
    if (!user?.email) {
      toast.error('You must be logged in to upload a profile picture');
      return;
    }

    try {
      setIsLoading(true);
      validateFile(file);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `${user.email}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('profile_pictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('profile_pictures')
        .getPublicUrl(filePath);

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({ 
          email: user.email,
          avatar_url: data.publicUrl 
        });

      if (updateError) throw updateError;

      setImageUrl(data.publicUrl);
      toast.success('Profile picture updated successfully');
    } catch (err) {
      console.error('Error uploading picture:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to upload picture');
    } finally {
      setIsLoading(false);
    }
  };

  const deletePicture = async () => {
    if (!user?.email || !imageUrl) return;

    try {
      setIsLoading(true);

      // Extract filename from URL
      const fileName = imageUrl.split('/').pop();
      if (!fileName) throw new Error('Invalid file URL');

      // Delete from storage
      const { error: deleteError } = await supabase.storage
        .from('profile_pictures')
        .remove([`${user.email}/${fileName}`]);

      if (deleteError) throw deleteError;

      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('email', user.email);

      if (updateError) throw updateError;

      setImageUrl(null);
      toast.success('Profile picture removed successfully');
    } catch (err) {
      console.error('Error deleting picture:', err);
      toast.error('Failed to delete profile picture');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    imageUrl,
    isLoading,
    uploadPicture,
    deletePicture,
  };
};