import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FormTextAreaProps {
  label: string;
  placeholder?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  required?: boolean;
  rows?: number;
  className?: string;
}

const FormTextArea = ({
  label,
  placeholder,
  error,
  registration,
  required,
  rows = 4,
  className = '',
}: FormTextAreaProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...registration}
        className={`
          w-full px-4 py-2
          bg-gray-800/50 backdrop-blur-sm
          border border-gray-700
          rounded-lg text-white
          focus:outline-none focus:ring-2 focus:ring-purple-500
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'hover:border-gray-600'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default FormTextArea;