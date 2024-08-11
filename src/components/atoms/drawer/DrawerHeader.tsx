import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../button';
import { Icon } from '../icon';
import { useDrawer } from './DrawerContext'; // Import useDrawer

interface DrawerHeaderProps {
  className?: string;
}

export const DrawerHeader: React.FC<PropsWithChildren<DrawerHeaderProps>> = ({
  className,
  children,
}) => {
  const { onClose } = useDrawer();  // Get closeDrawer from context

  return (
    <div
      className={twMerge(
        'flex-none flex justify-between items-center p-4 font-semibold text-lg',
        className
      )}
    >
      {children}
      <Button
        size="sm"
        className="p-2 rounded-full"
        variant="ghost"
        colorScheme="secondary"
        onClick={onClose}  // Use closeDrawer function
      >
        <Icon icon="close" size={16} />
      </Button>
    </div>
  );
};
