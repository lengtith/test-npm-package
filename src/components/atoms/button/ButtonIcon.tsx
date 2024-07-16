import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { Icon } from '../../../components';
import { IconName } from "../icon/Icon";

interface ButtonIconProps {
  size?: 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  name?: string;
  icon?: IconName;
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

const ButtonIcon: React.FC<ButtonIconProps> = ({
  size = 'sm',
  radius = 'full',
  isDisabled = false,
  name,
  icon = 'student',
  className = '',
  onClick,
  ...props
}) => {
  const styleMemo = useMemo(() => {
    const isDisabledStyles = isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

    return twMerge(
      'flex justify-center items-center p-1 border-2 border-gray-300 bg-gray-200',
      isDisabledStyles,
      radiusClasses[radius],
      sizeClasses[size],
      className
    );
  }, [size, radius, isDisabled, className]);

  return (
    <button
      disabled={isDisabled ? true : false}
      onClick={onClick}
      {...props}
      className={`${styleMemo}`}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default ButtonIcon;
