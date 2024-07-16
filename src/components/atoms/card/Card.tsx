import React, { MouseEventHandler, ReactNode } from 'react';
import { twMerge } from "tailwind-merge";

interface CardProps {
  children: ReactNode;
  className?: string;
  shadow?: "none" | "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  shadow = "md",
  radius = "md",
  onClick
}) => {

  const getShadowClass = `shadow-${shadow}`;
  const getRadiusClass = `rounded-${radius}`;
  return (
    <div className={twMerge("min-w-96 bg-white", className, getShadowClass, getRadiusClass)} onClick={onClick}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge("p-5", className)}>
      {children}
    </div>
  );
};

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge("p-5", className)}>
      {children}
    </div>
  );
};

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge("p-5", className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardBody, CardFooter };
