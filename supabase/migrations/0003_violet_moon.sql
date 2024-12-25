/*
  # Storage Setup for Profile Pictures

  1. Storage Configuration
    - Create bucket for profile pictures
    - Set up public access policies
    - Configure storage permissions

  2. Security
    - Enable RLS for storage
    - Add policies for authenticated users
*/

-- Create storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to profile pictures
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

-- Allow authenticated users to upload profile pictures
CREATE POLICY "Users can upload their own profile picture"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'avatars'
);

-- Allow users to update their own profile pictures
CREATE POLICY "Users can update their own profile picture"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profiles' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'avatars'
);

-- Allow users to delete their own profile pictures
CREATE POLICY "Users can delete their own profile picture"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profiles' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = 'avatars'
);