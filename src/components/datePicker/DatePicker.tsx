import React, { ChangeEvent, useState, useCallback, FC } from "react";

export interface DatePickerProps {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  defaultValue?: string;
}

const DatePicker: FC<DatePickerProps> = ({
  id,
  label,
  name,
  placeholder,
  errorMessage,
  required = false,
  onChange,
  value,
  defaultValue,
  ...rest
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    },
    [isControlled, onChange]
  );

  const inputValue = isControlled ? value : internalValue;

  return (
    <div className="relative">
      <input
        id={id || name}
        name={name}
        type="date"
        required={required}
        className={`block px-2.5 min-h-[46px] w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
          errorMessage ? "border-red-500" : ""
        }`}
        value={inputValue || ""} // Ensure the value is never null
        onChange={handleChange}
        placeholder={placeholder}
        {...rest}
      />
      {label && (
        <label
          htmlFor={id || name}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 rounded px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default DatePicker;
