import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { SettingsForm } from '../../components/admin/settings';
import { ToastContainer } from 'react-toastify';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-8">Settings</h1>
        <SettingsForm />
      </div>
      <ToastContainer position="top-right" theme="dark" />
    </AdminLayout>
  );
};

export default Settings;