import React, { useState, useRef, useEffect, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface DropdownItemProps {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  onClick?: () => void;
}

interface DropdownProps {
  buttonContent: string | React.ReactNode;
  items: DropdownItemProps[];
}

const Dropdown: React.FC<DropdownProps> = ({ buttonContent, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const renderItem = useCallback((item: DropdownItemProps, index: number) => (
    <button
      key={index}
      className={twMerge(
        "flex items-center w-full px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100",
        !item.onClick && "opacity-50 cursor-default"
      )}
      onClick={() => {
        if (item.onClick) {
          item.onClick();
        }
        setIsOpen(false);
      }}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </button>
  ), []);

  return (
    <div className="relative w-fit inline-block text-left" ref={menuRef}>
      <button
        onClick={handleToggle}
        className="inline-flex items-center justify-center p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none"
      >
        {buttonContent}
      </button>
      <div className={`absolute right-0 z-50 mt-2 min-w-32 bg-white rounded-lg shadow-lg p-1 transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default Dropdown;
