import React, { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface SwitchProps {
  id?: string;
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  label?: string;
}

const Switch: React.FC<SwitchProps> = ({
  id,
  name,
  checked: controlledChecked,
  onChange,
  size = "md",
  disabled = false,
  label,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(controlledChecked || false);

  useEffect(() => {
    if (controlledChecked !== undefined) {
      setIsChecked(controlledChecked);
    }
  }, [controlledChecked]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(event);
    }
  };

  const sizeClasses = {
    sm: "w-8 h-4 p-0.5",
    md: "w-12 h-6 p-1",
    lg: "w-16 h-8 p-1.5",
  };

  const ballSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const ballTranslateClasses = {
    sm: "translate-x-4",
    md: "translate-x-6",
    lg: "translate-x-8",
  };

  return (
    <label
      className={twMerge("w-fit flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-default")}
    >
      <input
        id={id}
        name={name}
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      <div
        className={twMerge("rounded-full", sizeClasses[size], isChecked ? "bg-blue-900" : "bg-gray-300")}
      >
        <div
          className={twMerge(
            "rounded-full transition-transform duration-300 ease-in-out transform bg-white",
            ballSizeClasses[size],
            isChecked ? `${ballTranslateClasses[size]}` : "translate-x-0"
          )}
        ></div>
      </div>
      {label && <span>{label}</span>}
    </label>
  );
};

export default Switch;