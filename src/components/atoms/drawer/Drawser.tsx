import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ReactDOM from 'react-dom';
import { DrawerProvider } from "./DrawerContext";

export interface DrawerProps {
  isOpen: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  onClose?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  children,
  size = 'md',
  className
}) => {
  const scrollPositionRef = useRef(0);
  const [show, setShow] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    const body = document.body;
    const innerHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;

    if (isOpen) {
      // Preserve scroll position
      scrollPositionRef.current = window.scrollY;
      setVisible(true);
      setTimeout(() => setShow(true), 100); // Allow transition to take effect

      // Lock body scroll if necessary
      if (bodyHeight > innerHeight) {
        body.classList.add('lock-scrollbar');
      }

      // Prevent scrolling
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.overflow = 'hidden';
    } else {
      setShow(false);
      setTimeout(() => setVisible(false), 300); // Match with transition duration

      // Restore body scroll
      body.classList.remove('lock-scrollbar');
      body.style.overflow = '';
      body.style.top = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('lock-scrollbar');
      document.body.style.overflow = '';
      document.body.style.top = '';
    };
  }, []);

  if (!visible) return null;

  // Define Tailwind classes for different sizes
  const sizeClasses = {
    sm: 'w-[300px] h-screen',
    md: 'w-[550px] h-screen',
    lg: 'w-2/4 h-screen',
    xl: 'w-3/4 h-screen',
    full: 'w-full h-screen'
  };

  // Define transform classes for different placements
  const transformClasses = {
    left: show ? 'translate-x-0' : '-translate-x-full',
    right: show ? 'translate-x-0' : 'translate-x-full',
    top: show ? 'translate-y-0' : '-translate-y-full',
    bottom: show ? 'translate-y-0' : 'translate-y-full'
  };

  // Define position classes for different placements
  const positionClasses = {
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
    left: 'left-0 top-0',
    right: 'right-0 top-0'
  };

  const baseClasses = 'flex flex-col fixed bg-white shadow-xl z-50 transition-all ease-in-out duration-300 overflow-auto';

  // Merge all drawer classes
  const drawerClasses = twMerge(
    baseClasses,
    positionClasses[placement],
    transformClasses[placement],
    sizeClasses[size],
    className
  );

  // Merge backdrop classes
  const backdropClasses = twMerge(
    'fixed inset-0 bg-black bg-opacity-50 z-40 transition-all ease-linear duration-300',
    show ? 'opacity-50' : 'opacity-0 pointer-events-none'
  );

  return ReactDOM.createPortal(
    <DrawerProvider isOpen={show} onClose={onClose!}>
      <div>
        <div className={backdropClasses} aria-hidden={!show} />
        <div
          className={drawerClasses}
          role="dialog"
          aria-modal={show}
          aria-hidden={!show}
        >
          {children}
        </div>
      </div>
    </DrawerProvider>,
    document.body
  );
};
