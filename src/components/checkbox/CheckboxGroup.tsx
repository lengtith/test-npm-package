import React, { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import Checkbox, { CheckboxProps } from './Checkbox'; // Adjust the import path as necessary

interface CheckboxGroupProps {
  label?: string;
  value?: string[];
  onChange?: (selectedValues: string[]) => void;
  direction?: 'horizontal' | 'vertical';
  required?: boolean;
  isInvalid?: boolean;
  children?: React.ReactNode;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label = "",
  value = [],
  onChange,
  direction = 'vertical',
  required = false,
  isInvalid = false,
  children
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: checkboxValue, checked } = e.target;
    let newValues = [...value];

    if (checked) {
      newValues.push(checkboxValue);
    } else {
      newValues = newValues.filter(v => v !== checkboxValue);
    }

    onChange?.(newValues); // Optional chaining to ensure onChange is defined
  };

  const checkboxes = React.Children.map(children, child => {
    if (React.isValidElement<CheckboxProps>(child) && child.type === Checkbox) {
      return React.cloneElement(child, {
        isChecked: value.includes(child.props.value || ""),
        onChange: handleChange,
      } as CheckboxProps);
    }
    return child;
  });

  return (
    <fieldset className={twMerge("space-y-2", direction === 'horizontal' && "flex space-x-4")}>
      <legend className={twMerge(isInvalid && 'text-red-500')}>
        {label} {required && <span aria-hidden="true">🌟</span>}
      </legend>
      <div>
        {checkboxes}
      </div>
      {isInvalid && (
        <span className="text-red-500" role="alert" aria-live="assertive">
          At least one option must be selected.
        </span>
      )}
    </fieldset>
  );
};

export default CheckboxGroup;
