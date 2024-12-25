import { motion } from 'framer-motion';
import AdminNotifications from './AdminNotifications';
import AdminUserMenu from './AdminUserMenu';
import { useAuth } from '../../../hooks/useAuth';
import { useSidebar } from '../../../contexts/SidebarContext';

const AdminHeader = () => {
  const { user } = useAuth();
  const { isCollapsed } = useSidebar();
  const SIDEBAR_WIDTH = 240;
  const COLLAPSED_WIDTH = 72;

  return (
    <motion.header
      initial={{ marginLeft: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      animate={{ marginLeft: isCollapsed ? COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed top-0 right-0 left-0 bg-gray-800/50 backdrop-blur-md border-b border-gray-700 p-4 z-10"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <AdminNotifications />
          <AdminUserMenu user={user} />
        </div>
      </div>
    </motion.header>
  );
};

export default AdminHeader;