import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../../components';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  colorScheme?: "primary" | "secondary" | "error" | "warning" | "success";
  onClick?: () => void;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "solid" | "outline" | "ghost" | "link";
  icon?: string;
  iconPosition?: "left" | "right" | "top" | "bottom";
  isDisabled?: boolean;
}

interface ColorVariantClasses {
  solid: string;
  outline: string;
  ghost: string;
  link: string;
}

interface ColorClasses {
  primary: ColorVariantClasses;
  secondary: ColorVariantClasses;
  error: ColorVariantClasses;
  warning: ColorVariantClasses;
  success: ColorVariantClasses;
}

const getColorSchemeClass = (colorScheme: keyof ColorClasses, variant: keyof ColorVariantClasses, isDisabled: boolean) => {
  const baseClass = "transition-colors duration-300";
  const disabledClass = "bg-gray-300 text-gray-500 cursor-not-allowed border rounded-lg";
  
  const colorClasses: ColorClasses = {
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
      solid: "!bg-error text-white hover:bg-error-200",
      outline: "text-error border border-error hover:bg-red-100",
      ghost: "text-error hover:bg-red-100",
      link: "text-error hover:underline"
    },
    warning: {
      solid: "!bg-warning text-white hover:bg-warning-200",
      outline: "text-warning border border-warning hover:bg-yellow-100",
      ghost: "text-warning hover:bg-yellow-100",
      link: "text-warning hover:underline"
    },
    success: {
      solid: "!bg-success text-white hover:bg-success-200",
      outline: "text-success border border-success hover:bg-green-100",
      ghost: "text-success hover:bg-green-100",
      link: "text-success hover:underline"
    }
  };
  
  return isDisabled
    ? `${baseClass} ${disabledClass}`
    : `${baseClass} ${colorClasses[colorScheme][variant]}`;
};

const getSizeClass = (size: "lg" | "md" | "sm" | "xs") => ({
  lg: "px-6 py-3 text-lg rounded-xl",
  md: "px-5 py-2 text-base rounded-lg",
  sm: "px-3 py-1 text-sm rounded-md",
  xs: "px-2 py-1 text-xs rounded"
}[size]);

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  colorScheme = "primary",
  onClick,
  size = "md",
  variant = "solid",
  icon,
  iconPosition = "right",
  isDisabled = false
}) => {
  const colorSchemeClass = useMemo(() => getColorSchemeClass(colorScheme, variant, isDisabled), [colorScheme, variant, isDisabled]);
  const sizeClass = useMemo(() => getSizeClass(size), [size]);
  const buttonClassNames = twMerge(
    `w-fit flex ${iconPosition === 'top' || iconPosition === 'bottom' ? 'flex-col' : 'flex-row'} items-center justify-center gap-2 ${sizeClass} ${colorSchemeClass}`,
    className
  );

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled ? "true" : "false"}
    >
      {(iconPosition === 'top' || iconPosition === 'left') && icon && <Icon icon={icon}/>}
      {children}
      {(iconPosition === 'right' || iconPosition === 'bottom') && icon && <Icon icon={icon}/>}
    </button>
  );
};

export default Button;