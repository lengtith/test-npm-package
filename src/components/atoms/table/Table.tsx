import React from "react";

interface TableProps {
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const Table: React.FC<TableProps> = ({
  children,
  className,
  "aria-label": ariaLabel,
}) => (
  <table className={`${className}`} aria-label={ariaLabel}>
    {children}
  </table>
);

export { Table };
