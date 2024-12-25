/*
  # Storage Configuration for Profile Pictures

  1. Storage Bucket Configuration
    - Create dedicated bucket for profile pictures
    - Configure public access and security policies

  2. Security Policies
    - Enable RLS for storage access
    - Set up user-specific access controls
*/

-- Create dedicated storage bucket for profile pictures
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_pictures', 'profile_pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to profile pictures
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

-- Allow authenticated users to manage their own pictures
CREATE POLICY "Users can manage their own pictures"
ON storage.objects
FOR ALL
USING (
  bucket_id = 'profile_pictures' AND
  auth.role() = 'authenticated' AND
  (storage.foldername(name))[1] = auth.email()
);