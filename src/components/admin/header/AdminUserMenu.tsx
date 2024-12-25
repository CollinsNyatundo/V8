import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { User } from '../../../types/auth';
import { useAuth } from '../../../hooks/useAuth';

interface AdminUserMenuProps {
  user: User | null;
}

const AdminUserMenu = ({ user }: AdminUserMenuProps) => {
  const { signOut } = useAuth();

  const getInitial = (email: string | undefined) => {
    if (!email) return '?';
    return email[0].toUpperCase();
  };

  return (
    <div className="flex items-center space-x-4">
      <button 
        className="p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors"
        aria-label="Open settings"
      >
        <Settings className="w-5 h-5" />
      </button>
      <button
        onClick={signOut}
        className="p-2 text-gray-300 hover:text-white hover:bg-purple-500/10 rounded-full transition-colors"
        aria-label="Sign out"
      >
        <LogOut className="w-5 h-5" />
      </button>
      <div className="flex items-center space-x-3">
        {user?.email && (
          <span className="text-sm text-gray-300">{user.email}</span>
        )}
        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
          <span className="text-sm font-medium text-purple-300">
            {getInitial(user?.email)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminUserMenu;