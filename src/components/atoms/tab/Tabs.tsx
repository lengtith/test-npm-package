import React, { useState, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TabsProps {
  children: ReactNode;
  defaultIndex?: number;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  return (
    <div className={twMerge(className)}>
      {React.Children.map(children, (child) => child)}
    </div>
  );
};

export { Tabs };
