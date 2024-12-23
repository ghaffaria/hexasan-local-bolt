import React from 'react';
import { usePoolTab } from './PoolTabContext';
import CreatePool from './tabs/CreatePool/index';
import ExtendPool from './tabs/ExtendPool';
import ImportPool from './tabs/ImportPool';
import DestroyPool from './tabs/DestroyPool';
import { PlaceholderTab } from '../common/PlaceholderTab';
import { poolTabs } from './config/tabConfig';

const PoolTabs: React.FC = () => {
  const { activeTab, setActiveTab } = usePoolTab();

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white border-b">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 p-2">
            {poolTabs.map(({ id, label, icon: Icon }) => (
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
        {activeTab === 'create' && <CreatePool />}
        {activeTab === 'extend' && <ExtendPool />}
        {activeTab === 'import' && <ImportPool />}
        {activeTab === 'destroy' && <DestroyPool />}
        {!['create', 'extend', 'import', 'destroy'].includes(activeTab) && (
          <PlaceholderTab title={poolTabs.find(t => t.id === activeTab)?.label || ''} />
        )}
      </div>
    </div>
  );
};

export default PoolTabs;
