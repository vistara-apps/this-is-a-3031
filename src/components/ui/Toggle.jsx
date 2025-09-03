import React from 'react';

/**
 * Toggle component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Toggle variant (default, withLabel)
 * @param {boolean} props.checked - Whether the toggle is checked
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.label] - Toggle label (for withLabel variant)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Toggle component
 */
const Toggle = ({ 
  variant = 'default', 
  checked = false, 
  onChange, 
  label,
  className = '',
  ...props 
}) => {
  const toggleClasses = `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
    checked ? 'bg-blue-500' : 'bg-white/20'
  }`;
  
  const thumbClasses = `pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
    checked ? 'translate-x-5' : 'translate-x-1'
  }`;
  
  if (variant === 'withLabel') {
    return (
      <label className={`flex items-center space-x-2 cursor-pointer ${className}`}>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={toggleClasses}
          {...props}
        >
          <span className="sr-only">{label}</span>
          <span className={thumbClasses} />
        </button>
        {label && <span className="text-sm text-white">{label}</span>}
      </label>
    );
  }
  
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${toggleClasses} ${className}`}
      {...props}
    >
      <span className="sr-only">Toggle</span>
      <span className={thumbClasses} />
    </button>
  );
};

export default Toggle;

