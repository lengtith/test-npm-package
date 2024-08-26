import React from 'react';
import { useSelectContext } from './SelectContext';
import { twMerge } from 'tailwind-merge';
import { Icon } from "../../../components";

interface SelectItemProps<T> {
  value: T;
  disabled?: boolean;
  children: React.ReactNode;
}

const SelectItem = <T,>({ value, disabled = false, children }: SelectItemProps<T>) => {
  const { value: selectedValue, onChange, multiple } = useSelectContext<T>();

  const isSelected = multiple
    ? Array.isArray(selectedValue) && selectedValue.some(v => JSON.stringify(v) === JSON.stringify(value))
    : JSON.stringify(selectedValue) === JSON.stringify(value);

  const handleClick = () => {
    if (disabled) return;

    if (multiple) {
      const newValue = Array.isArray(selectedValue) ? [...selectedValue] : [];
      const index = newValue.findIndex(v => JSON.stringify(v) === JSON.stringify(value));

      if (index >= 0) {
        newValue.splice(index, 1);
      } else {
        newValue.push(value);
      }

      onChange(newValue as T);
    } else {
      if (!isSelected) {
        onChange(value);
      }
    }
  };

  return (
    <li
      className={twMerge(
        "relative p-2 cursor-pointer flex justify-between items-center",
        disabled ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100",
        isSelected ? "bg-blue-50" : ""
      )}
      onClick={handleClick}
    >
      <span>{children}</span>
      
      {isSelected && multiple && (
        <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white rounded-full">
          <Icon icon="tick" size={14} />
        </span>
      )}
    </li>
  );
};

export default SelectItem;
