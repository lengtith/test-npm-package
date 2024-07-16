import React from "react";

interface TableContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const TableContainer: React.FC<TableContainerProps> = ({
  children,
  className,
}) => <div className={`${className}`}>{children}</div>;

export { TableContainer };
