import React from 'react';
import { useZvolTab } from './context/ZvolTabContext';
import { CreateVolume } from './tabs/CreateVolume';
import DeleteVolume from './tabs/DeleteVolume';
import { PlaceholderTab } from '../common/PlaceholderTab';
import { zvolTabs } from './config/tabConfig';

export const ZvolTabs: React.FC = () => {
  const { activeTab, setActiveTab } = useZvolTab();

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 p-2">
            {zvolTabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`
                  flex items-center px-4 py-2 rounded-lg text-sm font-medium
                  ${activeTab === id 
                    ? 'bg-[#1575C5] text-white' 
                    : 'bg-gray-50 text-gray-700 hover:bg-[#E8F4FD]'}
                `}
              >
                <Icon size={16} className="mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 bg-gray-50">
        {activeTab === 'create' && <CreateVolume />}
        {activeTab === 'delete' && <DeleteVolume />}
        {!['create', 'delete'].includes(activeTab) && (
          <PlaceholderTab title={zvolTabs.find(t => t.id === activeTab)?.label || ''} />
        )}
      </div>
    </div>
  );
};
