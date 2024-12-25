import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { DashboardStats } from '../../components/admin/dashboard/DashboardStats';
import { RecentProjects } from '../../components/admin/dashboard/RecentProjects';

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <DashboardStats />
        <RecentProjects />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;