import React, { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Checkbox, { CheckboxProps } from './Checkbox'; // Adjust the import path as necessary

interface CheckboxGroupProps {
  label?: string;
  value?: string[];
  onChange?: (selectedValues: string[]) => void;
  direction?: 'horizontal' | 'vertical';
  required?: boolean;
  isSubmitted?: boolean;
  className?: string;
  customError?: string;
}

const CheckboxGroup: React.FC<PropsWithChildren<CheckboxGroupProps>> = ({
  label = "",
  value = [],
  onChange,
  direction = 'vertical',
  required = false,
  isSubmitted = false,
  className,
  customError,
  children,
}) => {
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitted && required && value.length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [isSubmitted, required, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: checkboxValue, checked } = e.target;
    const newValues = checked
      ? [...value, checkboxValue]
      : value.filter(v => v !== checkboxValue);

    onChange?.(newValues); // Invoke onChange if defined
  };

  const checkboxes = React.Children.map(children, (child) => {
    if (React.isValidElement<CheckboxProps>(child) && child.type === Checkbox) {
      return React.cloneElement(child, {
        checked: value.includes(child.props.value || ""),
        onChange: handleChange,
      } as CheckboxProps);
    }
    return child;
  });

  return (
    <fieldset className={twMerge("space-y-2", className)}>
      {label && (
        <legend className={(isError ? 'text-red-500': '')}>
          {label} {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </legend>
      )}
      <div className={twMerge("flex", direction === 'horizontal' ? "space-x-4" : "flex-col space-y-2")}>
        {checkboxes}
      </div>
      {isError && (
        <span className="block text-red-500 text-sm mt-1" role="alert" aria-live="assertive">
          {customError || 'At least one option must be selected.'}
        </span>
      )}
    </fieldset>
  );
};

export default CheckboxGroup;
