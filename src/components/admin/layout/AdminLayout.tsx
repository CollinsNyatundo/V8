import React from 'react';
import { SidebarProvider } from '../../../contexts/SidebarContext';
import AdminSidebar from '../navigation/AdminSidebar';
import AdminHeader from '../header/AdminHeader';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen h-screen bg-gray-900 flex overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-6 pt-24 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;