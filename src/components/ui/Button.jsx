import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant (primary, secondary, outline, icon)
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Button component
 */
const Button = ({ 
  variant = 'primary', 
  isLoading = false, 
  disabled = false, 
  children, 
  onClick, 
  className = '',
  ...props 
}) => {
  // Base classes for all button variants
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none';
  
  // Variant-specific classes
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white px-4 py-2',
    outline: 'border border-white/20 hover:bg-white/10 text-white px-4 py-2',
    icon: 'bg-white/10 hover:bg-white/20 text-white p-2 rounded-full'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          <span>Loading...</span>
        </>
      ) : children}
    </button>
  );
};

export default Button;

