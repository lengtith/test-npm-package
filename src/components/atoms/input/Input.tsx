import React, { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps {
  id?: string;
  name?: string;
  type?: "text" | "number" | "email" | "password" | "tel" | "time" | "date" | "hidden";
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  className?: string;
  customError?: string;
  isSubmitted?: boolean;
  validate?: (value: string) => string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  type = "text",
  required = false,
  disabled = false,
  value,
  placeholder,
  className,
  customError,
  isSubmitted = false,
  validate,
  onChange,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string>(value || "");
  const [errorText, setErrorText] = useState<string>("");
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    if (onChange) {
      onChange(e);
    }
  };

  const valueInput = isControlled ? value : internalValue;

  const handleBlur = () => {
    let error = "";

    if (required && !valueInput) {
      error = `${label || name} is required`;
    }

    if (type === "email" && valueInput && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(valueInput)) {
      error = "Please enter a valid email address";
    }

    if (validate && !error) {
      error = validate(valueInput);
    }

    setErrorText(error);
    setIsFocus(false);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Show error message on form submission
  useEffect(() => {
    if (isSubmitted && required) {
      handleBlur();
    }
  }, [isSubmitted, required, handleBlur]);

  // Sync internal value with controlled value
  useEffect(() => {
    if (isControlled) {
      setInternalValue(value || "");
    }
  }, [value, isControlled]);

  return (
    <div>
      <div className={`relative bg-gray-50 rounded-lg ${type === "hidden" ? "hidden" : "block"}`}>
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : type}
          disabled={disabled}
          value={valueInput}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocus && !valueInput ? placeholder : ""}
          required={required}
          className={twMerge(
            "block px-2 min-h-[46px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            errorText ? "border-red-500" : "",
            className
          )}
          {...rest}
        />

        <label
          htmlFor={id}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label || name} {required && <span className="text-red-500">*</span>}
        </label>

        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={togglePasswordVisibility}
          >
            <span className="cursor-pointer text-gray-400 hover:text-gray-900">
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
        )}
      </div>
      {(errorText || customError) && (
        <span className="block text-red-500 text-xs mt-1.5">{customError || errorText}</span>
      )}
    </div>
  );
};

export default Input;
