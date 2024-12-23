import React, { createContext, useContext, useState } from 'react';

type TabType = 'create' | 'extend' | 'import' | 'export' | 'destroy' | 
               'shrink' | 'features' | 'history' | 'info' | 'benchmarks' | 'encrypt';

interface PoolTabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const PoolTabContext = createContext<PoolTabContextType | undefined>(undefined);

export const PoolTabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('create');

  return (
    <PoolTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </PoolTabContext.Provider>
  );
};

export const usePoolTab = () => {
  const context = useContext(PoolTabContext);
  if (!context) {
    throw new Error('usePoolTab must be used within a PoolTabProvider');
  }
  return context;
};
