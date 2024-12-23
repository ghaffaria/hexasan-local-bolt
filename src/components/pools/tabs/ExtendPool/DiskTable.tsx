import React from 'react';
import { Disk } from './types';

const mockDisks: Disk[] = [
  { id: 'disk1', vendor: 'WD', product: 'WD2003FYPS', revision: '1.0', capacity: '2TB', pool: 'pool1' },
  { id: 'disk2', vendor: 'Seagate', product: 'ST2000NM0011', revision: '1.0', capacity: '2TB', pool: 'pool2' },
];

export const DiskTable: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-900">Disks and Partitions: Member of a Pool</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revision</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pool</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockDisks.map((disk) => (
              <tr key={disk.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{disk.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disk.vendor}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disk.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disk.revision}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disk.capacity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{disk.pool}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
