import React from 'react';
import { Bell } from 'lucide-react';

const AdminNotifications = () => {
  return (
    <button 
      className="p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors"
      aria-label="View notifications"
    >
      <Bell className="w-5 h-5" />
    </button>
  );
};

export default AdminNotifications;