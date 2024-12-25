import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Eye, Users } from 'lucide-react';
import { StatCard } from './StatCard';

const stats = [
  { label: 'Total Projects', value: '12', icon: FileText, color: 'purple' },
  { label: 'Blog Posts', value: '24', icon: FileText, color: 'blue' },
  { label: 'Messages', value: '156', icon: MessageSquare, color: 'green' },
  { label: 'Total Views', value: '2.4K', icon: Eye, color: 'yellow' },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};