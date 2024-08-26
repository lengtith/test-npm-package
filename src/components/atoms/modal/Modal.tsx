import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { twMerge } from "tailwind-merge";
import ReactDOM from 'react-dom';
import { Button } from "../button";
import { Icon } from "../icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  size?: "full" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
  className?: string;
}

const Modal: React.FC<PropsWithChildren<Partial<ModalProps>>> = ({
  isOpen,
  onClose,
  children,
  size = "lg",
  className
}) => {
  const [show, setShow] = useState(isOpen);
  const [visible, setVisible] = useState(isOpen);
  const scrollPositionRef = useRef(0);

  // Map size prop to Tailwind CSS classes
  const sizeClasses = {
    full: "max-w-full h-screen",
    "2xl": "max-w-2xl",
    xl: "max-w-xl",
    lg: "max-w-lg",
    md: "max-w-md",
    sm: "max-w-sm",
    xs: "max-w-xs"
  };

  useEffect(() => {
    const body = document.body;
    const innerHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;

    if (isOpen) {
      // Preserve current scroll position
      scrollPositionRef.current = window.scrollY;

      // Show modal with a transition
      setVisible(true);
      setTimeout(() => setShow(true), 100);

      // Lock scroll if the content height is greater than the viewport height
      if (bodyHeight > innerHeight) {
        body.classList.add('lock-scrollbar');
      }

      // Prevent body scrolling
      body.style.top = `-${scrollPositionRef.current}px`;
      body.style.overflow = 'hidden';
    } else {
      // Hide modal with a transition
      setShow(false);
      setTimeout(() => setVisible(false), 300);

      // Restore body scroll
      body.classList.remove('lock-scrollbar');
      body.style.overflow = '';
      body.style.top = '';
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      // Cleanup: Ensure no residual side-effects on the body element
      document.body.classList.remove('lock-scrollbar');
      document.body.style.overflow = '';
      document.body.style.top = '';
    };
  }, []);

  if (!visible) return null;

  return ReactDOM.createPortal(
    <div
      id='sabai-ui-modal'
      className={twMerge(
        "fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300",
        show ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Overlay */}
      <div
        className={twMerge(
          "fixed inset-0 bg-black transition-opacity duration-300",
          show ? 'opacity-50' : 'opacity-0'
        )}
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div
        className={twMerge(
          "bg-white p-6 rounded shadow-lg z-10 w-full transform transition-transform duration-300",
          sizeClasses[size],
          className,
          show ? 'scale-100' : 'scale-90'
        )}
      >
        <Button
          size="sm"
          className='absolute top-2 right-2 p-2 rounded-full'
          variant="ghost"
          colorScheme="secondary"
          onClick={onClose}
        >
          <Icon icon="close" size={16} />
        </Button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
