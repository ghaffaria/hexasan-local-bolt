import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Pool } from './types';

const mockPools: Pool[] = [
  {
    name: 'pool1',
    state: 'ONLINE',
    allocated: '500GB',
    free: '1.5TB',
    health: 'ONLINE',
    scrubStatus: 'completed on Mon Mar 11 15:00:00 2024',
  },
  {
    name: 'pool2',
    state: 'DEGRADED',
    allocated: '750GB',
    free: '250GB',
    health: 'DEGRADED',
    scrubStatus: 'in progress, 45% complete',
  },
];

export const PoolStatus: React.FC = () => {
  const [expandedPool, setExpandedPool] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-green-50 px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-900">Pool Status</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {mockPools.map((pool) => (
          <div key={pool.name} className="p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setExpandedPool(expandedPool === pool.name ? null : pool.name)}
            >
              <div className="flex-1 grid grid-cols-6 gap-4">
                <div className="text-sm font-medium text-gray-900">{pool.name}</div>
                <div className="text-sm text-gray-500">{pool.state}</div>
                <div className="text-sm text-gray-500">{pool.allocated}</div>
                <div className="text-sm text-gray-500">{pool.free}</div>
                <div className="text-sm text-gray-500">{pool.health}</div>
                <div className="text-sm text-gray-500">{pool.scrubStatus}</div>
              </div>
              {expandedPool === pool.name ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {expandedPool === pool.name && (
              <div className="mt-4 pl-4 text-sm text-gray-600 border-l-2 border-gray-200">
                <pre className="whitespace-pre-wrap font-mono text-xs">
                  {`pool: ${pool.name}
state: ${pool.state}
scan: ${pool.scrubStatus}
config:

\tNAME        STATE     READ WRITE CKSUM
\t${pool.name}    ${pool.state}     0     0     0
\t  mirror-0  ONLINE     0     0     0
\t    sda     ONLINE     0     0     0
\t    sdb     ONLINE     0     0     0

errors: No known data errors`}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
