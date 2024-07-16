import React from "react";

interface TableRowProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  className,
  onClick,
}) => (
  <tr className={`${className}`} onClick={onClick}>
    {children}
  </tr>
);

export { TableRow };
