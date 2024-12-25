import React from 'react';
import { useProfilePicture } from '../../hooks/useProfilePicture';
import { LoadingSpinner } from '../admin';

interface ProfilePictureProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  editable?: boolean;
}

const defaultImage = 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&fit=crop&auto=format';

const sizes = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
};

export const ProfilePicture = ({ 
  size = 'md', 
  className = '',
  editable = false 
}: ProfilePictureProps) => {
  const { imageUrl, isLoading } = useProfilePicture();

  if (isLoading) {
    return (
      <div className={`${sizes[size]} flex items-center justify-center bg-gray-800 rounded-full`}>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl || defaultImage}
      alt="Profile"
      className={`${sizes[size]} rounded-full object-cover ${className}`}
      onError={(e) => {
        e.currentTarget.src = defaultImage;
      }}
    />
  );
};