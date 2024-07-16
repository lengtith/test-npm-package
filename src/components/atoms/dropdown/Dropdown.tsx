import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { Icon } from "../../../components";
import { twMerge } from 'tailwind-merge';

type Item = any;

export type DropdownProps = {
  label?: string;
  required?: boolean;
  items: Item[];
  className?: string;
  isLoading?: boolean;
  isSubmitted?: boolean;
  customError?: string;
  value?: Item;
  onChange: (item: Item) => void;
  renderSelectItem?: (item: Item) => ReactNode;
  renderDropdownItem?: (item: Item, isSelected: boolean, handleSelect: (item: Item) => void) => ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({
  label = "",
  value,
  items,
  className,
  renderSelectItem,
  onChange,
  renderDropdownItem
}) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownDirection, setDropdownDirection] = useState<'up' | 'down'>('down');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleSelectItem = (item: Item) => {
    setTimeout(() => {
      onChange(item);
      setIsFocused(false);
    }, 0);
  };
  const isActiveItem = (item: Item) => value?.id === item.id;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setIsFocused(false);
    if (!value && items.length > 0 && !label) {
      onChange(items[0]);
    }
  }, [value, items, onChange]);

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
        ref={containerRef}
        onBlur={handleBlur}
        onClick={handleFocus}
        tabIndex={0}
        className={twMerge(
          "relative w-full min-h-[46px] flex items-center gap-2 px-4 border rounded-lg border-gray-300 bg-gray-50 outline-none focus:border-blue-500"
        )}
      >
        <div className="flex flex-grow items-center gap-2 text-gray-900">
          <div className="text-gray-900">
            {label && !value
              ? <span>{label}</span>
              : renderSelectItem && value
                ? renderSelectItem(value)
                : <span>{value?.id}</span>
            }
          </div>
        </div>
        <div>
          <Icon
            icon="dropdown"
            className={`size-4 text-gray-500 transition-all duration-300 ease-in-out ${isFocused ? "rotate-180" : "rotate-0"}`}
          />
        </div>
        <ul
          ref={dropdownRef}
          className={twMerge(
            "text-gray-900 transition-all duration-300 ease-in-out absolute w-full left-0 mt-2 max-h-64 overflow-y-auto border border-gray-300 bg-white rounded-lg z-20",
            isFocused ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-2 invisible",
            dropdownDirection === 'up' ? '-top-full mt-0 mb-2' : 'top-full'
          )}
        >
          {items.map(item => (
            <div key={item.id} className="cursor-pointer">
              {renderDropdownItem
                ? renderDropdownItem(item, isActiveItem(item), handleSelectItem)
                : <div className="p-2 bg-white text-black hover:bg-gray-50" onClick={() => handleSelectItem(item)}>{item.id}</div>}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
