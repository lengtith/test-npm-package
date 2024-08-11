import React, { createContext, useContext, PropsWithChildren } from 'react';

interface DrawerContextProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const useDrawer = () => {

  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

export const DrawerProvider: React.FC<PropsWithChildren<DrawerContextProps>> = ({
  isOpen,
  onClose,
  children,
}) => {

  return (
    <DrawerContext.Provider value={{ isOpen, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
};
