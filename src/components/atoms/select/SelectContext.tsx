import React, { createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface SelectContextProps<T> {
  value: T;
  onChange: (value: T) => void;
  multiple: boolean;
}

const SelectContext = createContext<SelectContextProps<any> | undefined>(undefined);

export const useSelectContext = <T,>(): SelectContextProps<T> => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectProviderProps<T> {
  value: T;
  onChange: (value: T) => void;
  multiple: boolean;
  children: ReactNode;
}

export const SelectProvider = <T,>({
  value,
  onChange,
  multiple,
  children,
}: SelectProviderProps<T>) => {
  return (
    <SelectContext.Provider value={{ value, onChange, multiple }}>
      {children}
    </SelectContext.Provider>
  );
};
