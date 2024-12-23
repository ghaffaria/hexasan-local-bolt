import React from 'react';
import { ZvolTabs } from './ZvolTabs';
import { ZvolTabProvider } from './context/ZvolTabContext';

export const ZvolLayout: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="bg-white p-6 border-b">
        <h1 className="text-2xl font-semibold text-gray-900">Storage Volumes</h1>
        <p className="text-gray-600 mt-1">Create and manage ZFS volumes</p>
      </div>
      
      <ZvolTabProvider>
        <ZvolTabs />
      </ZvolTabProvider>
    </div>
  );
};
