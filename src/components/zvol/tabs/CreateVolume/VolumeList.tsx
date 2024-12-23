import React from 'react';
import { Zvol } from '../../types';

const mockVolumes: Zvol[] = [
  {
    name: 'vol1',
    pool: 'pool1',
    size: '10 GiB',
    used: '5 GiB',
    available: '5 GiB',
    deduplication: true,
    health: 'ONLINE',
  },
  {
    name: 'vol2',
    pool: 'pool2',
    size: '20 GiB',
    used: '15 GiB',
    available: '5 GiB',
    deduplication: false,
    health: 'ONLINE',
  },
];

export const VolumeList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Existing Volumes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dedup</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockVolumes.map((volume) => (
              <tr key={volume.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{volume.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.pool}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.used}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.available}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.deduplication ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.health}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
