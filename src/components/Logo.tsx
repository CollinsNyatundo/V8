import React from 'react';
import { Brain, LineChart } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <Brain className="w-8 h-8 text-purple-500" />
        <LineChart className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1" />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
        CN Analytics
      </span>
    </div>
  );
};

export default Logo;