import { ChevronDown } from 'lucide-react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Option {
  value: string;
  label: string;
}

interface StyledSelectProps {
  options: Option[];
  placeholder?: string;
  error?: string;
  registration?: UseFormRegisterReturn;
  label?: string;
  required?: boolean;
  className?: string;
}

const StyledSelect = ({
  options,
  placeholder = 'Select an option',
  error,
  registration,
  label,
  required,
  className = '',
}: StyledSelectProps) => {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          {...registration}
          className={`
            w-full px-4 py-2 pr-10 appearance-none
            bg-gray-800/50 backdrop-blur-sm
            border border-gray-700
            rounded-lg text-white
            focus:outline-none focus:ring-2 focus:ring-purple-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${error ? 'border-red-500 focus:ring-red-500' : 'hover:border-gray-600'}
          `}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(({ value, label }) => (
            <option
              key={value}
              value={value}
              className="bg-gray-800 text-white"
            >
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
};

export default StyledSelect;