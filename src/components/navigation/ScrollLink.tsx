import React from 'react';
import { Link } from 'react-router-dom';
import { scrollToSection } from '../../utils/scroll';

interface ScrollLinkProps {
  to: string;
  sectionId: string;
  children: React.ReactNode;
  className?: string;
}

const ScrollLink = ({ to, sectionId, children, className }: ScrollLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      window.location.href = to;
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

export default ScrollLink;