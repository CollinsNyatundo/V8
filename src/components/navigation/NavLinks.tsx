import React from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { navItems } from '../../utils/navigation';

interface NavLinksProps {
  onLinkClick?: () => void;
  className?: string;
  itemClassName?: string;
  isHomePage?: boolean;
}

const NavLinks = ({ 
  onLinkClick, 
  className = "flex space-x-6",
  itemClassName,
  isHomePage = true
}: NavLinksProps) => {
  const LinkComponent = isHomePage ? ScrollLink : RouterLink;

  return (
    <div className={className}>
      {navItems.map((item) => {
        if (isHomePage) {
          return (
            <ScrollLink
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              className={`
                relative text-sm font-medium
                transition-all duration-300 cursor-pointer 
                px-4 py-2 rounded-full
                text-white hover:text-[#B8A5DB] hover:bg-purple-500/10
                ${itemClassName || ''}
              `}
              onClick={onLinkClick}
              activeClass="active text-[#B8A5DB] bg-purple-500/10"
            >
              {item.name}
            </ScrollLink>
          );
        }

        return (
          <RouterLink
            key={item.name}
            to={`/#${item.to}`}
            className={`
              relative text-sm font-medium
              transition-all duration-300 cursor-pointer 
              px-4 py-2 rounded-full
              text-white hover:text-[#B8A5DB] hover:bg-purple-500/10
              ${itemClassName || ''}
            `}
            onClick={onLinkClick}
          >
            {item.name}
          </RouterLink>
        );
      })}
    </div>
  );
};

export default NavLinks;