import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: 'purple' | 'blue' | 'green' | 'yellow';
}

const colorVariants = {
  purple: 'bg-purple-500/10 text-purple-400',
  blue: 'bg-blue-500/10 text-blue-400',
  green: 'bg-green-500/10 text-green-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
};

export const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-lg p-6 hover:scale-[1.02] transition-transform duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorVariants[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};