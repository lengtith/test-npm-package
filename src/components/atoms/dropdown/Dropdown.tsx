import React, { createContext, useContext, ReactNode, useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from "../../../components";
import { twMerge } from 'tailwind-merge';

type Item = any;

interface DropdownContextType {
  value?: Item;
  onChange: (item: Item) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("DropdownItem must be used within a Dropdown");
  }
  return context;
};

export type DropdownProps = {
  label?: string;
  className?: string;
  value?: Item;
  onChange?: (item: Item) => void;
  renderSelectItem?: (item: Item) => ReactNode;
  children?: ReactNode;
};

export const Dropdown: React.FC<DropdownProps> = ({
  label = "",
  value,
  className,
  onChange,
  renderSelectItem,
  children,
}) => {
  const [internalValue, setInternalValue] = useState<Item | undefined>(value);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [dropdownPortal, setDropdownPortal] = useState(false);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

  const currentValue = value ?? internalValue;

  const handleSelectItem = (item: Item) => {
    setTimeout(() => {
      if (onChange) {
        onChange(item);
      } else {
        setInternalValue(item);
      }
      setIsFocused(false);
      setTimeout(() => {
        setDropdownPortal(false);
      }, 300);
    }, 0);
  };

  const handleToggle = () => {
    if (dropdownPortal) {
      setIsFocused(false);
      setTimeout(() => setDropdownPortal(false), 300);
    } else {
      setDropdownPortal(true);
      setTimeout(() => setIsFocused(true), 10);
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
      setTimeout(() => setDropdownPortal(false), 300);
    }
  }, []);

  useEffect(() => {
    if (dropdownPortal) {
      document.addEventListener('mousedown', handleClickOutside);

      if (dropdownRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const top = window.innerHeight - containerRect.bottom >= dropdownRect.height
          ? containerRect.bottom + window.scrollY
          : containerRect.top - dropdownRect.height + window.scrollY - 16;
        const left = containerRect.left + window.scrollX;
        const width = containerRect.width > dropdownRect.width ? containerRect.width : dropdownRect.width;

        setMenuStyles({ width, top, left });
      }
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownPortal, handleClickOutside]);

  const dropdownContent = dropdownPortal && ReactDOM.createPortal(
    <ul
      ref={dropdownRef}
      style={menuStyles}
      className={twMerge(
        "text-gray-900 transition-all duration-300 ease-in-out absolute w-fit mt-1.5 max-h-64 overflow-y-auto border border-gray-300 bg-white rounded-lg z-20",
        isFocused ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
      role="listbox" // ARIA: Role for the list of options
    >
      {children}
    </ul>,
    document.body
  );

  return (
    <DropdownContext.Provider
      value={{
        value: currentValue,
        onChange: handleSelectItem,
      }}
    >
      <div
        ref={containerRef}
        onClick={handleToggle}
        tabIndex={0}
        role="combobox" // ARIA: Role for combobox
        aria-haspopup="listbox" // ARIA: Indicates that this element controls a listbox
        aria-expanded={dropdownPortal} // ARIA: Indicates whether the dropdown is open
        aria-label={label} // ARIA: Optional, gives the dropdown a name if there's no visible label
        className={twMerge(
          "relative w-full min-h-[46px] flex items-center gap-2 px-4 border rounded-lg border-gray-300 bg-gray-50 outline-none focus:border-blue-500",
          className
        )}
      >
        <div className="flex flex-grow items-center gap-2 text-sm text-gray-900">
          <div>
            {label && !currentValue
              ? <span>{label}</span>
              : renderSelectItem && currentValue
                ? renderSelectItem(currentValue)
                : React.Children.map(children, (child: any) => {
                  if (child?.props?.value === currentValue) {
                    return child?.props.children;
                  }
                })
            }
          </div>
        </div>
        <div>
          <Icon
            icon="dropdown"
            size={14}
            className={`text-gray-500 transition-all duration-300 ease-in-out ${isFocused ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </div>

      {/* Dropdown Items */}
      {dropdownContent}
    </DropdownContext.Provider>
  );
};

export type DropdownItemProps = {
  value: Item;
  children?: ReactNode;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({ value, children }) => {
  const { value: selectedValue, onChange } = useDropdownContext();

  const isSelected = JSON.stringify(selectedValue) === JSON.stringify(value);

  return (
    <li
      className={twMerge(
        "cursor-pointer p-2 bg-white text-black hover:bg-gray-50",
        isSelected ? "bg-blue-50" : ""
      )}
      onClick={() => onChange(value)}
      role="option" // ARIA: Role for an option in the list
      aria-selected={isSelected} // ARIA: Indicates if this option is selected
    >
      {children}
    </li>
  );
};
