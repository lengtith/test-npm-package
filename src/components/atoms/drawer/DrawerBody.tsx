import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface DrawerBodyProps {
  className?: string;
}

export const DrawerBody: React.FC<PropsWithChildren<DrawerBodyProps>> = ({
  className,
  children,
}) => <div className={twMerge('flex-grow p-4', className)}>{children}</div>;