import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../../../components';

interface AvatarProps {
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  name?: string;
  icon?: string;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: 'h-10 w-10',
  md: 'h-12 w-12',
  lg: 'h-14 w-14'
};

const radiusClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 'md',
  radius = 'full',
  isDisabled = false,
  name,
  icon = 'user',
  className = '',
  onClick,
  ...props
}) => {
  const isDisabledStyles = isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  const mergedClasses = twMerge(
    'flex justify-center items-center p-1 border-2 border-gray-300 bg-gray-200',
    isDisabledStyles,
    radiusClasses[radius],
    sizeClasses[size],
    className
  );

  const handleClick = isDisabled ? undefined : onClick;

  return (
    <div aria-disabled={isDisabled ? 'true' : 'false'}>
      {src ? (
        <img
          onClick={handleClick}
          src={src}
          alt={name || 'Avatar'}
          className={mergedClasses}
          {...props}
        />
      ) : (
        <div onClick={handleClick} className={mergedClasses} {...props}>
          <Icon icon={icon} />
        </div>
      )}
    </div>
  );
};

export default Avatar;
