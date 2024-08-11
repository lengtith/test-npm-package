import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonUploadProps {
  children?: React.ReactNode;
  className?: string;
  colorScheme?: "primary" | "secondary" | "error" | "warning" | "success";
  onClick?: () => void;
  size?: "lg" | "md" | "sm" | "xs";
  variant?: "solid" | "outline" | "ghost" | "link";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  topIcon?: React.ReactNode;
  bottomIcon?: React.ReactNode;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onFileSelect?: (file: File) => void;
  accept?: string;
  name?: string;
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

  return isDisabled
    ? `${baseClass} ${disabledClass}`
    : `${baseClass} ${colorClasses[colorScheme][variant]}`;
};

const getSizeClass = ({
  lg: "px-6 py-3 text-lg rounded-xl",
  md: "px-5 py-2 text-base rounded-lg",
  sm: "px-3 py-1 text-sm rounded-md",
  xs: "px-2 py-1 text-xs rounded"
});

const ButtonUpload: React.FC<ButtonUploadProps> = ({
  children,
  className = "",
  colorScheme = "primary",
  onClick,
  size = "md",
  variant = "solid",
  leftIcon,
  rightIcon,
  topIcon,
  bottomIcon,
  isLoading,
  isDisabled = false,
  type = "button",
  onFileSelect,
  accept,
  name,
  ...props
}) => {
  const colorSchemeClass = getColorSchemeClass(
    colorScheme,
    variant,
    isDisabled
  );
  // size style
  const sizeClass = getSizeClass[size];
  const variantClass = variant === "outline" ? "bg-transparent" : "";
  const cursorClass = isDisabled || isLoading ? "" : "cursor-pointer";

  const buttonClassNames = twMerge(
    `font-semibold flex flex-col items-center justify-center gap-1 ${cursorClass} ${variantClass} ${sizeClass} ${colorSchemeClass}`,
    className
  );

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      onClick && onClick();
    }
  };

  return (
    <button
      className={buttonClassNames}
      onClick={handleButtonClick}
      type={type}
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading ? "true" : "false"}
      name={name}
      {...props}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept={accept}
      />

      {topIcon && (
        <div className="flex self-stretch justify-center">{topIcon}</div>
      )}
      <div className="flex items-center gap-2">
        {leftIcon}
        {isLoading ? "Loading..." : children}
        {rightIcon}
      </div>
      {bottomIcon && (
        <div className="flex self-stretch justify-center">{bottomIcon}</div>
      )}
    </button>
  );
};

export default ButtonUpload;
