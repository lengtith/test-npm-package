import React, { ChangeEvent, useEffect, useState } from "react";

export interface CheckboxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  value?: string;
  size?: "sm" | "md" | "lg";
  radius?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
}

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

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  checked: checkedProp,
  onChange,
  value,
  size = "md",
  radius = "md",
  disabled = false,
  className,
  children,
}) => {
  const [checked, setChecked] = useState(checkedProp || false);

  useEffect(() => {
    if (checkedProp !== undefined) {
      setChecked(checkedProp);
    }
  }, [checkedProp]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const isChecked = e.target.checked;
    setChecked(isChecked);
    onChange?.(e);
  };

  return (
    <label
      className={`inline-flex items-center w-fit ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        value={value}
      />
      <div
        className={`flex items-center justify-center border border-gray-400 ${
          checked ? "bg-blue-500" : "bg-gray-200"
        } ${sizeClasses[size]} ${radiusClasses[radius]}`}
      >
        {checked && (
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
  );
};

export default Checkbox;
