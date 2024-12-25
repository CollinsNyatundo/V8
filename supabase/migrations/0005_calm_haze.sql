/*
  # Create profiles and storage configuration
  
  1. New Tables
    - `profiles` table for storing user profile information
      - `id` (uuid, primary key) 
      - `email` (text, unique)
      - `avatar_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Storage
    - Create profile_pictures bucket
    - Configure public access and security policies

  3. Security
    - Enable RLS on profiles table
    - Add policies for profile management
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT CHECK (avatar_url ~ '^https?://'),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create updated_at trigger
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.email() = email);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.email() = email)
    WITH CHECK (auth.email() = email);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_pictures', 'profile_pictures', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
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

-- Create indexes
CREATE INDEX idx_profiles_email ON profiles(email);

-- Add documentation
COMMENT ON TABLE profiles IS 'Profile information for each user';
COMMENT ON COLUMN profiles.avatar_url IS 'URL to the user''s profile picture in storage';