import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  PropsWithChildren,
} from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';

// Context to manage menu state
interface MenuContextType {
  closeMenu: () => void;
}

// Create the MenuContext with a default undefined value
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Custom hook to use the MenuContext
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('MenuItem must be used within a Menu');
  }
  return context;
};

// Interface for Menu component props
export interface MenuProps {
  className?: string;
  icon?: React.ReactNode;
}

// Default icon if none is provided
const defaultIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
    />
  </svg>
);

// Menu component
export const Menu: React.FC<PropsWithChildren<MenuProps>> = ({
  className,
  children,
  icon = defaultIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to track if menu is open
  const [animateMenu, setAnimateMenu] = useState(false); // State to track animation
  const menuRef = useRef<HTMLUListElement>(null); // Reference to the menu
  const buttonRef = useRef<HTMLButtonElement>(null); // Reference to the button
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({}); // Inline styles for the menu

  // Toggle menu open/close state with animation handling
  const handleToggle = () => {
    if (isOpen) {
      setAnimateMenu(false); // Start closing animation
      setTimeout(() => setIsOpen(false), 300); // Delay menu close to finish animation
    } else {
      setIsOpen(true); // Open menu
      setTimeout(() => setAnimateMenu(true), 10); // Delay animation start slightly
    }
  };

  // Close menu if clicking outside of it
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setAnimateMenu(false); // Start closing animation
      setTimeout(() => setIsOpen(false), 300); // Delay menu close to finish animation
    }
  }, []);

  // Effect to handle positioning and outside clicks when menu is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Add event listener for clicks outside
      
      if (buttonRef.current && menuRef.current) {
        // Calculate menu position based on button position
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const menuRect = menuRef.current.getBoundingClientRect();
        const top = buttonRect.bottom + window.scrollY;
        const bottom =
          window.innerHeight - buttonRect.bottom >= menuRect.height
            ? top
            : buttonRect.top + window.scrollY - menuRect.height - 16;
        const left = 
          buttonRect.right <= menuRect.width 
            ? buttonRect.left + window.scrollX 
            : buttonRect.right - menuRect.width + window.scrollX;

        setMenuStyles({ top: bottom, left }); // Set calculated styles to menu
      }
    }

    return () => document.removeEventListener('mousedown', handleClickOutside); // Cleanup event listener
  }, [isOpen, handleClickOutside]);

  return (
    <MenuContext.Provider value={{ closeMenu: () => setIsOpen(false) }}>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className={twMerge(
          'w-11 h-11 flex items-center justify-center text-gray-900 rounded-full hover:bg-gray-100 focus:outline-none',
          className
        )}
      >
        {icon}
      </button>

      {isOpen &&
        ReactDOM.createPortal(
          <ul
            ref={menuRef}
            style={menuStyles}
            className={twMerge(
              'absolute z-50 my-2 text-left max-w-28 w-full bg-white rounded-lg shadow-lg p-0.5 transition-all duration-300 ease-in-out transform',
              animateMenu
                ? 'translate-y-0 opacity-100'
                : 'translate-y-2 opacity-0'
            )}
          >
            {children}
          </ul>,
          document.body
        )}
    </MenuContext.Provider>
  );
};

// Interface for MenuItem component props
export interface MenuItemProps {
  className?: string;
  onClick?: () => void;
}

// MenuItem component
export const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({
  onClick,
  className,
  children,
}) => {
  const { closeMenu } = useMenuContext();

  // Handle item click: execute provided onClick and close menu
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    closeMenu();
  };

  return (
    <li
      onClick={handleClick}
      className={twMerge(
        'cursor-pointer rounded-lg px-2.5 py-1.5 hover:bg-gray-100',
        className
      )}
    >
      {children}
    </li>
  );
};
