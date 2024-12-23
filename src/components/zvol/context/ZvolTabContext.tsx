import React, { createContext, useContext, useState } from 'react';
import { ZvolTabType } from '../types';

interface ZvolTabContextType {
  activeTab: ZvolTabType;
  setActiveTab: (tab: ZvolTabType) => void;
}

const ZvolTabContext = createContext<ZvolTabContextType | undefined>(undefined);

export const ZvolTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ZvolTabType>('create');

  return (
    <ZvolTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ZvolTabContext.Provider>
  );
};

export const useZvolTab = () => {
  const context = useContext(ZvolTabContext);
  if (!context) {
    throw new Error('useZvolTab must be used within a ZvolTabProvider');
  }
  return context;
};
