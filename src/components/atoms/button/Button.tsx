import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../../../components';
import { IconName } from "../icon/Icon";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  colorScheme?: "primary" | "secondary" | "error" | "warning" | "success";
  onClick?: (value?: any) => void;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "solid" | "outline" | "ghost" | "link";
  icon?: IconName;
  iconSize?: number;
  iconPosition?: "left" | "right" | "top" | "bottom";
  isDisabled?: boolean;
}

const colorClasses = {
  primary: {
    solid: "bg-blue-500 text-white hover:bg-blue-400",
    outline: "text-blue-500 border border-blue-500 hover:bg-blue-100",
    ghost: "text-blue-500 hover:bg-blue-100",
    link: "text-blue-500 hover:underline"
  },
  secondary: {
    solid: "bg-gray-500 text-white hover:bg-gray-400",
    outline: "text-gray-900 border border-gray-900 hover:bg-gray-400",
    ghost: "text-gray-900 hover:bg-gray-100",
    link: "text-gray-900 hover:underline"
  },
  error: {
    solid: "bg-red-500 text-white hover:bg-red-400",
    outline: "text-red-900 border border-red hover:bg-red-100",
    ghost: "text-red-900 hover:bg-red-100",
    link: "text-red-900 hover:underline"
  },
  warning: {
    solid: "bg-amber-500 text-white hover:bg-amber-400",
    outline: "text-amber-900 border border-amber-900 hover:bg-yellow-100",
    ghost: "text-amber-900 hover:bg-amber-100",
    link: "text-amber-900 hover:underline"
  },
  success: {
    solid: "bg-green-500 text-white hover:bg-green-400",
    outline: "text-green-900 border border-green-500 hover:bg-green-100",
    ghost: "text-green-900 hover:bg-green-100",
    link: "text-green-900 hover:underline"
  }
};

const sizeClasses = {
  lg: "px-6 py-3 text-lg rounded-xl",
  md: "px-5 py-2 text-base rounded-lg",
  sm: "px-3 py-1 text-sm rounded-md",
  xs: "px-2 py-1 text-xs rounded"
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  type = "button",
  children,
  className,
  colorScheme = "primary",
  onClick,
  size = "md",
  variant = "solid",
  icon,
  iconSize = 20,
  iconPosition = "right",
  isDisabled = false,
  ...props
}) => {
  const colorSchemeClass = colorClasses[colorScheme][variant];
  const sizeClass = sizeClasses[size];
  const disabledClass = "bg-gray-300 text-gray-500 cursor-not-allowed border rounded-lg";

  const buttonClassNames = twMerge(
    `w-fit h-fit flex ${iconPosition === 'top' || iconPosition === 'bottom' ? 'flex-col' : 'flex-row'} 
    items-center justify-center gap-2 transition-colors duration-300 ${isDisabled ? disabledClass : colorSchemeClass} ${sizeClass}`,
    className
  );

  return (
    <button
      type={type}
      className={buttonClassNames}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...props}
    >
      {(iconPosition === 'top' || iconPosition === 'left') && icon && (
        <Icon size={iconSize} icon={icon} />
      )}
      {children}
      {(iconPosition === 'right' || iconPosition === 'bottom') && icon && (
        <Icon size={iconSize} icon={icon} />
      )}
    </button>
  );
};

export default Button;
