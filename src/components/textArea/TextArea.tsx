import React, { ChangeEvent, useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export interface TextareaProps {
  id?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  label?: string;
  className?: string;
  customError?: string;
  isSubmitted?: boolean;

  validate?: (value: string) => string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  name,
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
  const [internalValue, setInternalValue] = useState(value || "");
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [inputPlaceholder, setInputPlaceholder] = useState("");

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    if (onChange) {
      onChange(e);
    }
  }, [onChange]);

  const valueInput = isControlled ? value : internalValue;

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    let errorText = "";
    if (required && !valueInput) {
      errorText = `${label || name} is required`;
    }

    if (validate && !errorText) {
      errorText = validate(valueInput);
    }

    setErrorText(errorText);
  }, [label, name, required, validate, valueInput, setIsFocused]);

  const handleFocus = useCallback(() => {
    setInputPlaceholder(placeholder || "")
  }, []);

  useEffect(() => {
    if (isSubmitted && required) {
      setError(valueInput === "" ? true : false);
      handleBlur();
    }
  }, [isSubmitted, required, valueInput, handleBlur]);

  useEffect(() => {
    if (valueInput !== "") {
      setError(false);
    }
  }, [valueInput]);

  return (
    <div>
      <div className="relative bg-gray-50">
        <textarea
          id={id}
          name={name}
          disabled={disabled}
          value={valueInput}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={inputPlaceholder}
          required={required}
          className={twMerge(
            "block px-2 pt-[11px] min-h-[46px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer", error ? "border-red-500" : "", className
          )}
          {...rest}
        />

        <label
          htmlFor={id}
          className={twMerge(
            "absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-inherit px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[22px] peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-1/2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          )}
        >
          {label || name} {required && <span className="text-red-500">*</span>}
        </label>
      </div>

      {(error || customError) && (
        <span className="text-red-500 text-xs">{customError || errorText}</span>
      )}
    </div>
  );
};

export default Textarea;
