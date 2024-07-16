import React, { useState, useRef, useEffect, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export interface MenuItemProps {
  icon?: React.ReactNode;
  label: string | React.ReactNode;
  onClick?: () => void;
}

export interface MenuProps {
  className?: string;
  buttonContent: string | React.ReactNode;
  items: MenuItemProps[];
}

const Menu: React.FC<MenuProps> = ({ className, buttonContent, items }) => {
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

  const renderItem = useCallback((item: MenuItemProps, index: number) => (
    <button
      key={index}
      className={twMerge(
        "flex items-center min-w-full text-sm text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100")}
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
    <div className={twMerge("relative w-fit inline-block text-left")} ref={menuRef}>
      <button
        onClick={handleToggle}
        className={twMerge("w-max items-center justify-center text-gray-900 rounded-full hover:bg-gray-100 focus:outline-none",className)}
      >
        {buttonContent}
      </button>
      <div className={`absolute right-0 z-50 mt-2 min-w-32 max-w-fit bg-white rounded-lg shadow-lg p-1 transition-all duration-300 ease-in-out ${isOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
        {items.map(renderItem)}
      </div>
    </div>
  );
};

export default Menu;
