import React from "react";

interface TableHeadProps {
  children?: React.ReactNode;
  className?: string;
}

const TableHead: React.FC<TableHeadProps> = ({ children, className }) => (
  <thead className={`${className}`}>{children}</thead>
);

export { TableHead };
