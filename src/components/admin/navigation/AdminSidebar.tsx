import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { adminNavItems } from '../../../utils/admin';
import { useSidebar } from '../../../contexts/SidebarContext';
import { useAuth } from '../../../hooks/useAuth';
import AdminNavItem from './AdminNavItem';
import Logo from '../../Logo';

const SIDEBAR_WIDTH = 240;
const COLLAPSED_WIDTH = 72;

const AdminSidebar = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  const toggleCollapse = (): void => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.aside
      initial={{ width: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      animate={{ width: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`
        relative flex flex-col h-screen
        bg-gray-800/50 backdrop-blur-md border-r border-gray-700
        overflow-hidden shrink-0
      `}
    >
      {/* Toggle button */}
      <button
        onClick={toggleCollapse}
        className={`
          absolute top-4 -right-3 z-10
          w-6 h-6 rounded-full
          bg-gray-800 border border-gray-700
          flex items-center justify-center
          text-gray-400 hover:text-white
          transition-colors
        `}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div className={`
        p-4 flex items-center
        ${isCollapsed ? 'justify-center' : 'justify-start'}
      `}>
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {adminNavItems.map((item) => (
          <AdminNavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={isCollapsed}
            isActive={
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path)
            }
          />
        ))}
      </nav>

      {/* Sign Out Button */}
      <div className="p-4">
        <button
          onClick={signOut}
          className={`
            w-full px-4 py-2 rounded-lg
            text-gray-400 hover:text-white hover:bg-purple-500/10
            transition-colors duration-200
            flex items-center
            ${isCollapsed ? 'justify-center' : 'justify-start'}
          `}
        >
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: isCollapsed ? 0 : 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className={`${isCollapsed ? 'hidden' : 'block'}`}
          >
            Sign Out
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;