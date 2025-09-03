import React from 'react';
import { Info, AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';

/**
 * Alert banner component with various variants
 * @param {Object} props - Component props
 * @param {string} [props.variant='info'] - Alert variant (info, success, warning, error)
 * @param {string} props.title - Alert title
 * @param {string} [props.description] - Alert description
 * @param {boolean} [props.dismissible=false] - Whether the alert can be dismissed
 * @param {Function} [props.onDismiss] - Dismiss handler
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Alert banner component
 */
const AlertBanner = ({ 
  variant = 'info', 
  title, 
  description, 
  dismissible = false,
  onDismiss,
  className = '',
  ...props 
}) => {
  // Variant-specific classes and icons
  const variantConfig = {
    info: {
      classes: 'bg-blue-500/10 border-blue-400/30',
      icon: <Info className="w-5 h-5 text-blue-400" />
    },
    success: {
      classes: 'bg-green-500/10 border-green-400/30',
      icon: <CheckCircle className="w-5 h-5 text-green-400" />
    },
    warning: {
      classes: 'bg-yellow-500/10 border-yellow-400/30',
      icon: <AlertTriangle className="w-5 h-5 text-yellow-400" />
    },
    error: {
      classes: 'bg-red-500/10 border-red-400/30',
      icon: <AlertCircle className="w-5 h-5 text-red-400" />
    }
  };
  
  const { classes, icon } = variantConfig[variant];
  
  return (
    <div
      className={`p-4 rounded-lg border ${classes} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {icon}
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          {description && (
            <div className="mt-1 text-sm text-white/80">
              {description}
            </div>
          )}
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 p-1.5 text-white/50 hover:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;

