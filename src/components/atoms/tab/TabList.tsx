import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TabListProps {
  children: ReactNode;
  className?: string;
}

const TabList: React.FC<TabListProps> = ({ children, className = "" }) => {
  return (
    <div
      role="tablist"
      className={twMerge("flex bg-[#F8F8F8] rounded-full", className)}
    >
      {children}
    </div>
  );
};

export { TabList };
