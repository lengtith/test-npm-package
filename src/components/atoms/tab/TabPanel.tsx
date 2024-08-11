import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TabPanelProps {
  index: number;
  children: ReactNode;
  activeIndex: number;
  className?: string;
}

const TabPanel: React.FC<TabPanelProps> = ({
  index,
  children,
  activeIndex,
  className = "",
}) => {
  const isActive = index === activeIndex;

  return (
    <div
      role="tabpanel"
      id={`panel-${index}`}
      aria-labelledby={`tab-${index}`}
      hidden={!isActive}
      className={twMerge("pt-6", className)}
    >
      {children}
    </div>
  );
};

export { TabPanel };
