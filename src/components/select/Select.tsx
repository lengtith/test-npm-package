import React, { memo, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from "../../components";
import { twMerge } from 'tailwind-merge';

interface Item {
  [key: string]: any;
}

type MultipleSelectProps = {
  multiple: true;
  value: Item[];
  onChange: (items: Item[]) => void;
}

type SingleSelectProps = {
  multiple?: false;
  value?: Item;
  onChange: (item: Item) => void;
}

type SelectProps = {
  label?: string;
  required?: boolean;
  items: Item[];
  className?: string;
  isLoading?: boolean;
  isSubmitted?: boolean;
  customError?: string;
  renderSelectItem?: (item: Item) => ReactNode;
  scrollRef?: RefObject<HTMLDivElement>;
  renderDropdownItem?: (item: Item, isSelected: boolean, handleSelect: (item: Item) => void) => ReactNode;
} & (SingleSelectProps | MultipleSelectProps);

const Select: React.FC<SelectProps> = ({
  label = "Select",
  required = false,
  multiple,
  value,
  isLoading,
  isSubmitted = false,
  items,
  className,
  customError,
  scrollRef,
  renderSelectItem,
  onChange,
  renderDropdownItem
}) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownDirection, setDropdownDirection] = useState<'up' | 'down'>('down');
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleSelectItem = (item: Item) => {
    if (multiple) {
      if (value.includes(item)) {
        onChange(value.filter(o => o !== item));
      } else {
        setError(false);
        onChange([...value, item]);
      }
    } else {
      if (item !== value) {
        setIsFocus(false);
        onChange(item);
      }
      if (required && !value) {
        setError(true);
      }
    }
    if (!multiple) {
      setIsFocus(false);
      setError(false);
    }
  };

  const handleActiveItemSelected = (item: Item) => {
    return (multiple)
      ? value.some(v => v.id === item.id)
      : value?.id === item.id;
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
    if (required && (JSON.stringify(value).length === 2 || (Array.isArray(value) && value.length === 0))) {
      setError(true);
    }
  }

  useEffect(() => {
    if ((isFocus || isSubmitted) && required && (JSON.stringify(value).length === 2 || (Array.isArray(value) && value.length === 0))) {
      setError(true)
    };
  }, [isSubmitted, error, value]);

  useEffect(() => {
    const checkDropdownDirection = () => {
      if (!dropdownRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;

      const spaceBelow = window.innerHeight - containerRect.bottom;
      const spaceAbove = containerRect.top;

      if (spaceBelow >= dropdownHeight) {
        setDropdownDirection('down');
      } else if (spaceAbove >= dropdownHeight) {
        setDropdownDirection('up');
      } else {
        setDropdownDirection(spaceBelow > spaceAbove ? 'down' : 'up');
      }
    };

    window.addEventListener('resize', checkDropdownDirection);
    checkDropdownDirection();

    return () => {
      window.removeEventListener('resize', checkDropdownDirection);
    };
  }, []);

  return (
    <div className={twMerge("relative", className)}>
      <div
        onBlur={handleBlur}
        onClick={handleFocus}
        tabIndex={0}
        className={twMerge(
          "relative w-full min-h-[46px] flex items-center gap-2 px-4 border rounded-lg border-gray-300 bg-gray-50 outline-none focus:border-blue-500",
          error ? "border-red-500" : ""
          , className)}
      >
        <label className={twMerge(
          "absolute max-w-full text-gray-500 text-sm transition-all duration-300 transform z-0 origin-[0] px-2 start-1",
          (isFocus || JSON.stringify(value).length > 2) ? "top-0 -translate-y-1/2 scale-75 text-blue-500 bg-inherit" : "top-1/2 -translate-y-1/2 scale-100 bg-transparent"
        )}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        <div className="flex flex-wrap flex-grow items-center gap-2 text-gray-900">
          {(multiple)
            ? value.map(v => (
              <div
                key={v.id}
                className="flex gap-1 items-center py-1 px-2 bg-gray-100 rounded"
              >
                <span className="cursor-pointer">
                  {renderSelectItem
                    ? renderSelectItem(v)
                    : <span>{v.id}</span>}
                </span>
                <span
                  className="flex items-center justify-center w-4 h-4 hover:bg-white hover:text-red-500 rounded-full cursor-pointer"
                  onClick={() => handleSelectItem(v)}
                >
                  x
                </span>
              </div>
            ))
            : (
              <div className="text-gray-900">
                {renderSelectItem && value
                  ? renderSelectItem(value)
                  : <span>
                    {value?.id}
                  </span>
                }
              </div>
            )
          }
        </div>

        <div>
          <Icon
            icon="dropdown"
            size={16}
            className={`text-gray-500 transition-all duration-300 ease-in-out ${isFocus ? "rotate-180" : "rotate-0"}`}
          />
        </div>

        <ul
          ref={dropdownRef}
          className={twMerge(
            "text-gray-900 transition-all duration-300 ease-in-out absolute w-full left-0 top-full mt-2 max-h-64 overflow-y-auto border border-gray-300 bg-white rounded-lg z-20",
            isFocus ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible",
            dropdownDirection === 'up' ? '-top-full' : ''
          )}
        >
          {items.map(item => (
            <div key={item.id} className={twMerge(multiple ? "relative" : "", "cursor-pointer")}>
              {renderDropdownItem
                ? renderDropdownItem(item, handleActiveItemSelected(item), handleSelectItem)
                : <div onClick={() => handleSelectItem(item)}>{item.id}</div>}
              {multiple && handleActiveItemSelected(item) && (
                <span className='absolute right-3 top-1/3 flex items-center justify-center w-5 h-5 bg-blue-900 text-white rounded-full'>
                  <Icon
                    icon="tick"
                    size={12}
                  />
                </span>
              )}
            </div>
          ))}
          {isLoading && <div className="text-center p-2">Loading...</div>}
          <div ref={scrollRef} className="invisible" />
        </ul>
      </div>
      <span className={twMerge("text-red-500 text-xs transition-all duration-150", error ? "block opacity-100" : "hidden opacity-0")}>
        {customError || `${label} is required`}
      </span>
    </div>
  );
};

export default Select;
