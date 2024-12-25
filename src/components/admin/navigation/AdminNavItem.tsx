import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminNavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
}

const AdminNavItem = ({
  icon: Icon,
  label,
  path,
  isCollapsed,
  isActive,
}: AdminNavItemProps) => {
  return (
    <NavLink
      to={path}
      className={`
        relative flex items-center px-4 py-3 mx-2 rounded-lg
        transition-colors duration-200
        ${isActive 
          ? 'text-purple-400 bg-purple-500/10' 
          : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
        }
      `}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      
      {!isCollapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          className="ml-3 whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}

      {isActive && (
        <motion.div
          layoutId="active-nav-item"
          className="absolute inset-0 rounded-lg bg-purple-500/10 -z-10"
          transition={{ duration: 0.2 }}
        />
      )}
    </NavLink>
  );
};

export default AdminNavItem;