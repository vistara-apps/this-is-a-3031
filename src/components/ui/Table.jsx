import React from 'react';

/**
 * Table component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Table content
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} Table component
 */
const Table = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  );
};

/**
 * Table header component
 */
Table.Header = ({ children, className = '', ...props }) => (
  <thead className={`${className}`} {...props}>
    {children}
  </thead>
);

/**
 * Table body component
 */
Table.Body = ({ children, className = '', ...props }) => (
  <tbody className={`${className}`} {...props}>
    {children}
  </tbody>
);

/**
 * Table row component
 */
Table.Row = ({ children, className = '', ...props }) => (
  <tr className={`border-b border-white/10 ${className}`} {...props}>
    {children}
  </tr>
);

/**
 * Table header cell component
 */
Table.HeaderCell = ({ children, className = '', ...props }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium text-white/70 ${className}`} {...props}>
    {children}
  </th>
);

/**
 * Table cell component
 */
Table.Cell = ({ children, className = '', ...props }) => (
  <td className={`px-4 py-3 text-sm text-white ${className}`} {...props}>
    {children}
  </td>
);

/**
 * Table footer component
 */
Table.Footer = ({ children, className = '', ...props }) => (
  <tfoot className={`border-t border-white/10 ${className}`} {...props}>
    {children}
  </tfoot>
);

export default Table;

