import React from 'react';

/**
 * Notification indicator component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='dot'] - Notification variant (dot, badge)
 * @param {number} [props.count] - Notification count (for badge variant)
 * @param {React.ReactNode} props.children - Component content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Notification indicator component
 */
const NotificationIndicator = ({ 
  variant = 'dot', 
  count, 
  children, 
  className = '',
  ...props 
}) => {
  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex ${className}`} {...props}>
        {children}
        <div className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-red-500 text-white text-xs font-medium">
          {count > 99 ? '99+' : count}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative inline-flex ${className}`} {...props}>
      {children}
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500" />
    </div>
  );
};

export default NotificationIndicator;

