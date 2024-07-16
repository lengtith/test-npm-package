import React, { ChangeEvent, useEffect, useState } from "react";

export interface CheckboxProps {
  isChecked?: boolean;
  value?: string;
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  isChecked: controlledChecked,
  onChange,
  value,
  size = "md",
  radius = "md",
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(controlledChecked || false);

  useEffect(() => {
    if (controlledChecked !== undefined) {
      setIsChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const { checked } = e.target;
    setIsChecked(checked);
    if (onChange) {
      onChange(e);
    }
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const radiusClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <div className="block">
      <label
        className={`${className} inline-flex items-center ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          type="checkbox"
          className={`hidden`}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          {...props}
        />
        <div
          className={`flex items-center justify-center ${sizeClasses[size]} ${radiusClasses[radius]} border border-gray-400 ${isChecked ? "bg-blue-500" : "bg-gray-200"}`}
        >
          {isChecked && (
            <svg
              className={`fill-current text-white ${sizeClasses[size]}`}
              viewBox="0 0 20 20"
            >
              <path d="M6.173 10.267l2.385 2.384 5.66-5.66 1.415 1.415-7.075 7.075-3.8-3.8z" />
            </svg>
          )}
        </div>
        {children && <span className="ml-2">{children}</span>}
      </label>
    </div>
  );
};

export default Checkbox;
