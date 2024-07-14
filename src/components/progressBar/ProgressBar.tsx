import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  progress?: number;
  className?: string;
  progressClassName?: string;
  containerClassName?: string;
  animationDuration?: number;
  showLabel?: boolean;
}

const ProgressBar: React.FC<Props> = ({
  progress = 0,
  className,
  progressClassName = "bg-blue-500",
  containerClassName = "bg-gray-100",
  animationDuration = 500,
  showLabel = false,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  return (
    <div className={twMerge("flex items-center gap-5 w-full text-sm text-gray-500", className)}>
      <div className={twMerge("flex-grow rounded-full h-2.5", containerClassName)}>
        <div
          className={twMerge("h-full rounded-full transition-all ease-out", progressClassName)}
          style={{ width: `${currentProgress}%`, transitionDuration: `${animationDuration}ms` }}
        ></div>
      </div>
      {showLabel && (
        <span className="flex-none">
          {currentProgress}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;