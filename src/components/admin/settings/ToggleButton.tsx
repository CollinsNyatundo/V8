import React from 'react';
import { motion } from 'framer-motion';

interface ToggleButtonProps {
  isEnabled: boolean;
  onToggle: () => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

const ToggleButton = ({
  isEnabled,
  onToggle,
  label,
  description,
  disabled = false,
}: ToggleButtonProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col flex-grow mr-4">
        <label className="text-sm font-medium text-gray-300">{label}</label>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        role="switch"
        aria-checked={isEnabled}
        onClick={onToggle}
        disabled={disabled}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out focus:outline-none
          focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
          ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${isEnabled ? 'bg-purple-600' : 'bg-gray-700'}
        `}
      >
        <span className="sr-only">{label}</span>
        <motion.span
          layout
          className={`
            inline-block h-4 w-4 rounded-full bg-white shadow
            transform transition-transform duration-200 ease-in-out
            ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};

export default ToggleButton;