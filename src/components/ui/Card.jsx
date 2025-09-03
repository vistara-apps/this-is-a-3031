import React from 'react';

/**
 * Card component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='default'] - Card variant (default, elevated)
 * @param {React.ReactNode} props.children - Card content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Card component
 */
const Card = ({ 
  variant = 'default', 
  children, 
  className = '',
  ...props 
}) => {
  // Base classes for all card variants
  const baseClasses = 'rounded-xl backdrop-blur-sm';
  
  // Variant-specific classes
  const variantClasses = {
    default: 'glass-effect p-6',
    elevated: 'glass-effect p-6 shadow-card'
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card header component
 */
Card.Header = ({ children, className = '', ...props }) => (
  <div className={`mb-6 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card title component
 */
Card.Title = ({ children, className = '', ...props }) => (
  <h3 className={`text-2xl font-bold text-white ${className}`} {...props}>
    {children}
  </h3>
);

/**
 * Card description component
 */
Card.Description = ({ children, className = '', ...props }) => (
  <p className={`text-white/70 ${className}`} {...props}>
    {children}
  </p>
);

/**
 * Card content component
 */
Card.Content = ({ children, className = '', ...props }) => (
  <div className={`${className}`} {...props}>
    {children}
  </div>
);

/**
 * Card footer component
 */
Card.Footer = ({ children, className = '', ...props }) => (
  <div className={`mt-6 pt-4 border-t border-white/20 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;

