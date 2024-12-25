import React from 'react';
import { Bell, Settings } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import AdminNotifications from './header/AdminNotifications';
import AdminUserMenu from './header/AdminUserMenu';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <AdminNotifications />
          <AdminUserMenu user={user} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;