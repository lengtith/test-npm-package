import React, { ReactNode, FC } from "react";
import { twMerge } from "tailwind-merge";

interface TabProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Tab: FC<TabProps> = ({ children, className }) => {
  return <div className={twMerge("h-full p-5", className)}>
    {children}
  </div>;
};

export default Tab;