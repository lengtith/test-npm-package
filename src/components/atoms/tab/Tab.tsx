import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TabProps {
  index: number;
  children: ReactNode;
  onClick?: (index: number) => void;
  activeIndex: number;
  disabled?: boolean;
  className?: string;
  classNames?: {
    active?: string;
    disabled?: string;
  };
}

const Tab: React.FC<TabProps> = ({
  index,
  children,
  onClick,
  activeIndex,
  disabled,
  className = "",
  classNames = {},
}) => {
  const isActive = index === activeIndex;
  const { active = "", disabled: disabledClass = "" } = classNames;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${index}`}
      id={`tab-${index}`}
      tabIndex={isActive ? 0 : -1}
      className={twMerge(`h-10 flex-1 rounded-full text-center transition text-[#000] ${isActive ? `text-white bg-[#2B2F7E] ${active}` : ""
        } ${disabled
          ? `cursor-not-allowed opacity-50 ${disabledClass}`
          : `${onClick ? "cursor-pointer" : "cursor-default"}`
        } ${className}`)}
      onClick={() => !disabled && onClick && onClick(index)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Tab };
