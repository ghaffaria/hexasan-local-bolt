import React from 'react';
import { Pool } from './types';

const mockPools: Pool[] = [
  { 
    name: 'pool1', 
    state: 'OFFLINE', 
    status: 'HEALTHY',
    lastSeen: '2024-03-11 15:00:00',
  },
  { 
    name: 'pool2', 
    state: 'DESTROYED', 
    status: 'FAULTED',
    lastSeen: '2024-03-10 12:30:00',
  },
];

export const PoolList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-900">Existing Pools</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Seen</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockPools.map((pool) => (
              <tr key={pool.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pool.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
