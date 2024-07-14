import React, { useEffect, useMemo, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  placement = 'right',
  children,
  size = 'md'
}) => {
  useEffect(() => {
    const overflowStyle = isOpen ? 'hidden' : 'unset';
    document.body.style.overflow = overflowStyle;
    return () => {
      if (document.body.style.overflow === overflowStyle) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  const sizeClasses = useMemo(() => ({
    sm: 'w-[300px] h-screen',
    md: 'w-[550px] h-screen',
    lg: 'w-2/4 h-screen',
    xl: 'w-3/4 h-screen',
    full: 'w-full h-screen'
  }), []);

  const transformClasses = useMemo(() => ({
    left: isOpen ? 'translate-x-0' : '-translate-x-full',
    right: isOpen ? 'translate-x-0' : 'translate-x-full',
    top: isOpen ? 'translate-y-0' : '-translate-y-full',
    bottom: isOpen ? 'translate-y-0' : 'translate-y-full'
  }), [isOpen]);

  const positionClasses = useMemo(() => ({
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
    left: 'left-0 top-0',
    right: 'right-0 top-0'
  }), []);

  const drawerClasses = useMemo(() => {
    const baseClasses = 'flex flex-col fixed bg-white shadow-xl z-50 transition-all ease-in-out duration-300 p-5';
    return twMerge(
      baseClasses,
      positionClasses[placement],
      transformClasses[placement],
      sizeClasses[size]
    );
  }, [size, placement, isOpen]);

  const backdropClasses = useMemo(() => twMerge(
    'fixed inset-0 bg-black bg-opacity-50 z-40 transition-all ease-linear duration-300',
    isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
  ), [isOpen]);

  return (
    <>
      <div className={backdropClasses} aria-hidden={!isOpen}/>
      <div className={drawerClasses} role="dialog" aria-modal={isOpen} aria-hidden={!isOpen}>
        {children}
      </div>
    </>
  );
};

interface DrawerHeaderProps {
  onClose: () => void;
  children: ReactNode;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ onClose, children }) => (
  <div className="flex-none flex justify-between items-center p-4 font-semibold text-lg">
    {children}
    <button
      onClick={onClose}
      className="ml-4 text-gray-500 hover:text-gray-700"
    >
      &#10005;
    </button>
  </div>
);

interface DrawerBodyProps {
  children: ReactNode;
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({ children }) => (
  <div className="flex-grow p-4">{children}</div>
);

interface DrawerFooterProps {
  children: ReactNode;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children }) => (
  <div className="flex-none p-4">{children}</div>
);