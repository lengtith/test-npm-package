import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface DrawerFooterProps {
  className?: string;
}

export const DrawerFooter: React.FC<PropsWithChildren<DrawerFooterProps>> = ({
  className,
  children,
}) => <div className={twMerge('flex-none p-4', className)}>{children}</div>;
