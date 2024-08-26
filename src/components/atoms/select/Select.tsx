import React, { useRef, useState, useEffect, ReactNode, CSSProperties, RefObject, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from "../../../components";
import { twMerge } from 'tailwind-merge';
import { SelectProvider } from "./SelectContext";

interface SelectProps<T> {
  value: T;
  onChange: (value: T) => void;
  multiple?: boolean;
  renderSelectedItem?: (item: T) => ReactNode;
  label?: string;
  required?: boolean;
  className?: string;
  isLoading?: boolean;
  isSubmitted?: boolean;
  customError?: string;
  children: ReactNode;
  scrollRef?: RefObject<HTMLDivElement>;
}

const Select = <T,>({
  value,
  onChange,
  multiple = false,
  renderSelectedItem,
  label = "Select",
  required = false,
  className,
  isLoading,
  isSubmitted = false,
  customError,
  children,
  scrollRef,
}: SelectProps<T>) => {
  const dropdownRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<boolean>(false);
  const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {

    const hasValue = Array.isArray(value) ? value.length > 0 : !!value;
    if (hasValue) {
      setError(false);
    }

    if ((isSubmitted && required && !hasValue)) {
      setError(true);
    }

  }, [value, isSubmitted, required]);

  const handleToggle = () => {
    if (dropdownVisible) {
      setIsAnimating(false);
      setTimeout(() => setDropdownVisible(false), 300);
    } else {
      setDropdownVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
    }
  };

  const handleClickOutside = useCallback((event: any) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsAnimating(false);
      setTimeout(() => setDropdownVisible(false), 300);
    }
  }, []);

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);

      if (dropdownRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const dropdownRect = dropdownRef.current.getBoundingClientRect();
        const top = window.innerHeight - containerRect.bottom >= dropdownRect.height
          ? containerRect.bottom + window.scrollY
          : containerRect.top - dropdownRect.height + window.scrollY - 12;
        const left = containerRect.left + window.scrollX;
        const width = containerRect.width > dropdownRect.width ? containerRect.width : dropdownRect.width;

        setDropdownStyles({ width, top, left });
      }
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownVisible, handleClickOutside]);

  const handleItemClick = (item: T) => {
    if (!multiple) {
      onChange(item);
    } else {
      const newValue = Array.isArray(value) ? [...value] : [];
      const itemIndex = newValue.indexOf(item);
      if (itemIndex > -1) {
        newValue.splice(itemIndex, 1);
      } else {
        newValue.push(item);
      }
      onChange(newValue as T);
    }
  };

  const renderSelected = (item: T) =>
    renderSelectedItem
      ? renderSelectedItem(item)
      : React.Children.map(children, (child: any) => {
        if (child?.props?.value === item) {
          return child?.props.children;
        }
      });

  const ItemSelect = (
    <div className="flex flex-grow items-center flex-wrap gap-2 text-sm text-gray-900">
      {Array.isArray(value)
        ? value.map((v, index) =>
          <div key={index} className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded-full">
            {renderSelected(v)}
            <span className="flex items-center justify-center bg-gray-100 rounded-full w-4 h-4" onClick={() => handleItemClick(v)}>
              <Icon icon="close" size={10} />
            </span>
          </div>)
        : renderSelected(value)
      }
    </div>
  );

  const DropdownIcon = (
    <div>
      <Icon
        icon="dropdown"
        size={16}
        className={`text-gray-500 transition-all duration-300 ease-in-out ${isAnimating ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );

  const Label = (
    <label
      className={twMerge(
        "absolute max-w-full text-sm transition-all duration-300 transform z-0 origin-[0] px-2 start-1",
        (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value)
          ? "top-0 -translate-y-1/2 scale-75 bg-inherit"
          : "top-1/2 -translate-y-1/2 scale-100 bg-transparent"
      )}
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  const ErrorText = (
    <span
      className={twMerge(
        "text-red-500 text-xs mt-1.5 transition-all duration-150",
        error ? "block opacity-100" : "hidden opacity-0"
      )}
    >
      {customError || `${label} is required`}
    </span>
  );

  const Dropdown = dropdownVisible && ReactDOM.createPortal(
    <ul
      ref={dropdownRef}
      role="listbox"
      style={dropdownStyles}
      className={twMerge(
        "absolute mt-1.5 max-h-64 overflow-y-auto border border-gray-300 bg-white rounded-lg z-50 transition-all duration-300 ease-in-out",
        isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) &&
        React.cloneElement(child)
      )}

      {/* Loading data when sync data */}
      {isLoading && <div className="text-center p-2">Loading...</div>}

      {/* For only sync data */}
      <div ref={scrollRef} className="invisible" />
    </ul>,
    document.body
  );

  return (
    <SelectProvider value={value} onChange={onChange} multiple={multiple}>
      <div
        ref={containerRef}
        onClick={handleToggle}
        role="combobox"
        aria-haspopup="listbox"
        aria-label={label}
        aria-required={required}
        aria-expanded={dropdownVisible}
        tabIndex={0}
        className={twMerge(
          "relative w-full min-h-[46px] flex items-center gap-2 px-2 border rounded-lg border-gray-300 bg-gray-50 text-gray-500 outline-none focus:border-blue-500 focus:text-blue-500",
          error ? "border-red-500 text-red-500" : ""
          , className)}
      >
        {Label}
        {ItemSelect}
        {DropdownIcon}
      </div>
      {ErrorText}
      {Dropdown}
    </SelectProvider>
  );
};

export default Select;