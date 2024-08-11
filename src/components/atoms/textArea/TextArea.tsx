import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps {
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  label?: string;
  rows?: number;
  cols?: number;
  className?: string;
  customError?: string;
  isSubmitted?: boolean;
  validate?: (value: string) => string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  name,
  label,
  value,
  rows = 4,
  cols,
  placeholder,
  className,
  required = false,
  disabled = false,
  customError,
  isSubmitted = false,
  validate,
  onChange,
  ...rest
}) => {
  const [internalValue, setInternalValue] = useState<string>(value || "");
  const [errorText, setErrorText] = useState<string | undefined>(customError);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);

      if (onChange) {
        onChange(e);
      }
    },
    [onChange]
  );

  const handleBlur = useCallback(() => {
    let errorText = customError;

    if (required && !internalValue) {
      errorText = `${label || name} is required`;
    } else if (validate) {
      errorText = validate(internalValue);
    }

    setErrorText(errorText);
    setIsFocused(false);
  }, [internalValue, required, validate, label, name, customError]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    if (isSubmitted && required) {
      handleBlur();
    }
  }, [isSubmitted, required, handleBlur]);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <div>
      <div className="relative bg-gray-50">
        <textarea
          id={id}
          name={name}
          disabled={disabled}
          value={internalValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={isFocused && !internalValue ? placeholder : ""}
          required={required}
          rows={rows}
          cols={cols}
          className={twMerge(
            "block px-2 pt-[11px] min-h-[46px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
            errorText ? "border-red-500" : "",
            className
          )}
          {...rest}
        />

        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[22px] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          )}
        >
          {label || name} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      {errorText && (
        <span className="block text-red-500 text-xs mt-1.5">{errorText}</span>
      )}
    </div>
  );
};

export default Textarea;
