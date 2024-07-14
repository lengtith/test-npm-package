import React, { ChangeEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
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
  const [internalValue, setInterinternalValue] = useState(value || "");
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [inputPlaceholder, setInputPlaceholder] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInterinternalValue = e.target.value;
    setInterinternalValue(newInterinternalValue);

    if (onChange) {
      onChange(e);
    }
  };

  const valueInput = isControlled ? value : internalValue;

  const handleBlur = () => {
    let errorText = "";
    if (required && !valueInput) {
      errorText = `${label || name} is required`;
    }

    if (
      type === "email" &&
      valueInput &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(valueInput)
    ) {
      errorText = "Please enter a valid email address";
    }

    if (validate && !errorText) {
      errorText = validate(valueInput);
    }

    setErrorText(errorText);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle user submit form to show error message
  useEffect(() => {
    if (isSubmitted && required) {
      setError(valueInput === "" ? true : false);
      handleBlur();
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (valueInput !== "") {
      setError(false);
    }
  }, [valueInput]);

  return (
    <div>
      <div className="relative bg-gray-50">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : type}
          disabled={disabled}
          value={valueInput}
          onChange={handleChange}
          onFocus={() => setInputPlaceholder(placeholder || "")}
          onBlur={handleBlur}
          placeholder={inputPlaceholder}
          required={required}
          className={twMerge("block px-2 min-h-[46px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer", error ? "border-red-500" : "", className)}
          {...rest}
        />

        <label
          htmlFor={id}
          className={twMerge("absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1")}
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

      {(error || customError) && (
        <span className="text-red-500 text-xs">{customError || errorText}</span>
      )}
    </div>
  );
};

export default Input;
