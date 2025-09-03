import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Input component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Input variant (default, withDropdown)
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.placeholder] - Input placeholder
 * @param {boolean} [props.disabled=false] - Whether the input is disabled
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} props.onChange - Change handler
 * @returns {JSX.Element} Input component
 */
const Input = forwardRef(({ 
  variant = 'default', 
  type = 'text', 
  placeholder, 
  disabled = false, 
  className = '',
  onChange,
  ...props 
}, ref) => {
  // Base classes for all input variants
  const baseClasses = 'w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed';
  
  if (variant === 'withDropdown') {
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className={`${baseClasses} pr-10 ${className}`}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <ChevronDown className="w-4 h-4 text-white/50" />
        </div>
      </div>
    );
  }
  
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      className={`${baseClasses} ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;

