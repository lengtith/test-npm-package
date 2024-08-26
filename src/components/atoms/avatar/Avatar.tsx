import React, { PropsWithChildren, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../../../components';
import { AvatarContext } from './AvatarGroup'; // Assuming AvatarGroup is in the same directory

export interface AvatarProps {
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  isDisabled?: boolean;
  isBordered?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  name?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

// Size classes for the avatar
const SIZE_CLASSES = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-14 w-14 text-lg',
};

// Color classes for the avatar border
const COLOR_CLASSES = {
  default: '',
  primary: 'border-blue-500',
  secondary: 'border-indigo-500',
  success: 'border-green-500',
  warning: 'border-yellow-500',
  danger: 'border-red-500',
};

// Border radius classes for the avatar
const RADIUS_CLASSES = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

const Avatar: React.FC<PropsWithChildren<AvatarProps>> = ({
  src,
  size,
  color,
  radius,
  isDisabled,
  isBordered,
  name,
  icon = 'user',
  className = '',
  onClick,
  children,
  ...props
}) => {
  // Fetch global Avatar context values, if any
  const context = useContext(AvatarContext);

  // Fallback to context values if props are not provided
  const finalSize = size || context?.size || 'sm';
  const finalColor = color || context?.color || 'default';
  const finalRadius = radius || context?.radius || 'full';
  const finalIsDisabled = isDisabled ?? context?.isDisabled ?? false;
  const finalIsBordered = isBordered ?? context?.isBordered ?? false;

  // Combine classes using tailwind-merge and apply conditional styling for disabled state
  const mergedClasses = twMerge(
    'flex justify-center items-center bg-white',
    finalIsDisabled ? 'cursor-default opacity-75' : 'cursor-pointer opacity-100',
    finalIsBordered ? `border-2 ${COLOR_CLASSES[finalColor]}` : '',
    RADIUS_CLASSES[finalRadius],
    SIZE_CLASSES[finalSize],
    className
  );

  // Handle click events, preventing clicks when disabled
  const handleClick = finalIsDisabled ? undefined : onClick;

  return (
    <div aria-disabled={finalIsDisabled} onClick={handleClick}
      title={name || ''}>
      {src ? (
        // If `src` is provided, render an image
        <img
          src={src}
          alt={name || 'Avatar'}
          className={mergedClasses}
          {...props}
        />
      ) : children ? (
        // If children are provided, render the children
        <div className={mergedClasses} {...props}>
          {children}
        </div>
      ) : (
        // Otherwise, render an icon placeholder
        <div className={mergedClasses} {...props}>
          <Icon icon={icon} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
