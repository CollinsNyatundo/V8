import React from 'react';
import AdminLayout from '../../components/admin/layout/AdminLayout';
import { MessagesList } from '../../components/admin/messages/MessagesList';

const Messages = () => {
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-white">Messages</h1>
        </div>
        <MessagesList />
      </div>
    </AdminLayout>
  );
};

export default Messages;