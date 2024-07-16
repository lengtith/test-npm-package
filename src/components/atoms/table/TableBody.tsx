import React from "react";

interface TableBodyProps {
  children?: React.ReactNode;
  className?: string;
}

const TableBody: React.FC<TableBodyProps> = ({ children, className }) => (
  <tbody className={`${className}`}>{children}</tbody>
);

export { TableBody };
