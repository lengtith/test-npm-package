import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import ReactDOM from 'react-dom';

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
    if (isOpen) {
      scrollPositionRef.current = window.scrollY;
      setVisible(true);
      setTimeout(() => setShow(true), 10); // Adding a small timeout to allow for transition
      body.classList.add('lock-scrollbar');
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.overflow = 'hidden';
    } else {
      setShow(false);
      setTimeout(() => setVisible(false), 300); // Match the duration with transition duration
      body.classList.remove('lock-scrollbar');
      body.style.overflow = '';
      body.style.top = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('lock-scrollbar');
      document.body.style.overflow = '';
      document.body.style.top = '';
    };
  }, []);

  if (!visible) return null;

  const sizeClasses = ({
    sm: 'w-[300px] h-screen',
    md: 'w-[550px] h-screen',
    lg: 'w-2/4 h-screen',
    xl: 'w-3/4 h-screen',
    full: 'w-full h-screen'
  });

  const transformClasses = ({
    left: show ? 'translate-x-0' : '-translate-x-full',
    right: show ? 'translate-x-0' : 'translate-x-full',
    top: show ? 'translate-y-0' : '-translate-y-full',
    bottom: show ? 'translate-y-0' : 'translate-y-full'
  });

  const positionClasses = ({
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
    left: 'left-0 top-0',
    right: 'right-0 top-0'
  });

  const baseClasses = 'flex flex-col fixed bg-white shadow-xl z-50 transition-all ease-in-out duration-300 overflow-auto';

  const drawerClasses = twMerge(
    baseClasses,
    positionClasses[placement],
    transformClasses[placement],
    sizeClasses[size],
    className
  );

  const backdropClasses = twMerge(
    'fixed inset-0 bg-black bg-opacity-50 z-40 transition-all ease-linear duration-300',
    show ? 'opacity-50' : 'opacity-0 pointer-events-none'
  );

  return ReactDOM.createPortal(
    <div>
      <div className={backdropClasses} aria-hidden={!show} />
      <div className={drawerClasses} role="dialog" aria-modal={show} aria-hidden={!show}>
        {children}
      </div>
    </div>
  , document.body);
};

interface DrawerHeaderProps {
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ onClose, className, children }) => (
  <div className={twMerge("flex-none flex justify-between items-center p-4 font-semibold text-lg", className)}>
    {children}
    <button
      onClick={onClose}
      className="ml-4 text-gray-500 hover:text-gray-900"
    >
      &#10005;
    </button>
  </div>
);

interface DrawerBodyProps {
  className?: string;
  children: ReactNode;
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({ className, children }) => (
  <div className={twMerge("flex-grow p-4", className)}>{children}</div>
);

interface DrawerFooterProps {
  className?: string;
  children: ReactNode;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ className, children }) => (
  <div className={twMerge("flex-none p-4", className)}>{children}</div>
);