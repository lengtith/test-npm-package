import React from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

const Skeleton: React.FC<SkeletonProps> = ({ className, children }) => {
  return (
    <div className={twMerge("animate-pulse bg-gray-300 rounded-md", className)}>
      {children}
    </div>
  );
};

export default Skeleton;
