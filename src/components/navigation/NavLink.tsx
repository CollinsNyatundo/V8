import React from 'react';
import { Link } from 'react-scroll';
import { useNavigation } from '../../hooks/useNavigation';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ to, children, onClick, className }: NavLinkProps) => {
  const { isActive } = useNavigation(to);

  return (
    <Link
      to={to}
      spy={true}
      smooth={true}
      duration={500}
      className={`
        relative text-sm font-medium
        transition-all duration-300 cursor-pointer 
        px-4 py-2 rounded-full
        ${isActive 
          ? 'text-[#B8A5DB] bg-purple-500/10' 
          : 'text-white hover:text-[#B8A5DB] hover:bg-purple-500/10'
        }
        ${className || ''}
      `}
      onClick={onClick}
      activeClass="active"
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B8A5DB] transition-all duration-300" />
      )}
    </Link>
  );
};

export default NavLink;