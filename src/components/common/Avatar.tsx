import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface AvatarProps {
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ src, alt, className = '' }: AvatarProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <LazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        className="w-full h-full object-cover"
        wrapperClassName="w-full h-full"
      />
    </div>
  );
};

export default Avatar;