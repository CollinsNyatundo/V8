import React from 'react';

interface StaticProfilePictureProps {
  className?: string;
}

export const StaticProfilePicture = ({ className = '' }: StaticProfilePictureProps) => {
  return (
    <img
      src="https://gthmyaaznoggluosgtah.supabase.co/storage/v1/object/public/profile_pictures/Profile%20Picture.jpg"
      alt="Collins Nyagaka"
      className={`object-cover object-center ${className}`}
      loading="lazy"
    />
  );
};