import React from 'react';
import PoolTabs from './PoolTabs';
import { PoolTabProvider } from './PoolTabContext';

const PoolsLayout: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-white p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-900">Storage Pools</h1>
        <p className="text-gray-600 mt-1">Manage and configure ZFS storage pools</p>
      </div>
      
      <PoolTabProvider>
        <PoolTabs />
      </PoolTabProvider>
    </div>
  );
};

export default PoolsLayout;
