import React from 'react';
import { Volume } from './types';

const mockVolumes: Volume[] = [
  { name: 'vol1', pool: 'Pool0', used: '1.2G', available: '22.7G', referenced: '1.0G', mountpoint: '-', hasSnapshots: true, hasClones: false },
  { name: 'vol2', pool: 'Pool0', used: '2.5G', available: '21.4G', referenced: '2.3G', mountpoint: '-', hasSnapshots: false, hasClones: true },
  { name: 'vol3', pool: 'rpool', used: '5.1G', available: '94.9G', referenced: '5.0G', mountpoint: '-', hasSnapshots: false, hasClones: false },
];

export const VolumeList: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-900">List of All Volumes</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referenced</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mount Point</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Snapshots</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockVolumes.map((volume) => (
              <tr key={volume.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{volume.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.pool}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.used}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.available}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.referenced}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.mountpoint}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.hasSnapshots ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{volume.hasClones ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
