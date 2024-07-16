import React from "react";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={twMerge("animate-pulse bg-gray-300 rounded-md", className)}>
    </div>
  );
};

export default Skeleton;
