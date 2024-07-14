import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { twMerge } from "tailwind-merge";

interface ModalProps {
  open: boolean;
  children?: ReactNode;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
}

const sizeClasses = {
  xs: "max-w-xs w-2/12",
  sm: "max-w-sm w-4/12",
  md: "max-w-md w-6/12",
  lg: "max-w-lg w-7/12",
  xl: "max-w-xl w-8/12",
  "2xl": "max-w-5xl w-9/12",
  "3xl": "max-w-7xl w-10/12",
  "4xl": "max-w-7xl w-11/12",
  full: "w-full",
};

const Modal: React.FC<ModalProps> = ({
  open,
  children,
  className,
  size = "md",
}) => {
  const widthClass = sizeClasses[size];


  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center py-4 top-0 left-0 right-0 z-50 backdrop-brightness-50 transition-all duration-300 ease-linear ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
    >
      <div
        className={twMerge("bg-white max-h-[800px] overflow-auto rounded-lg transition-all duration-300 ease-in-out", widthClass , open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4", className)}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
