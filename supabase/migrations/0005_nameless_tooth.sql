/*
  # Add profile pictures storage configuration
  
  1. Storage Configuration
    - Create profile_pictures bucket
    - Configure public access
    - Set up security policies for user uploads

  2. Security
    - Add storage policies for profile picture management
    - Ensure proper access control
*/

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_pictures', 'profile_pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
DO $$ BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Profile pictures are publicly accessible" ON storage.objects;
  DROP POLICY IF EXISTS "Users can upload their own profile picture" ON storage.objects;
  DROP POLICY IF EXISTS "Users can update their own profile picture" ON storage.objects;
  DROP POLICY IF EXISTS "Users can delete their own profile picture" ON storage.objects;
END $$;

-- Create new policies
CREATE POLICY "Profile pictures are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profile_pictures');

CREATE POLICY "Users can upload their own profile picture"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'profile_pictures' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.email()
    );

CREATE POLICY "Users can update their own profile picture"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'profile_pictures'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.email()
    );

CREATE POLICY "Users can delete their own profile picture"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'profile_pictures'
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.email()
    );