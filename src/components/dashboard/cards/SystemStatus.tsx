import React from 'react';
import { StatusIndicator } from '../status/StatusIndicator';
import { SystemService } from '../../../types';

const services: SystemService[] = [
  { name: 'iSCSI Targets', status: 'running' },
  { name: 'Backup Services', status: 'warning' },
  { name: 'Storage Pools', status: 'critical' },
];

export const SystemStatus: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-medium text-gray-700 mb-3">System Status</h2>
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service.name} className="text-sm flex justify-between">
            <span>{service.name}</span>
            <StatusIndicator status={service.status} />
          </li>
        ))}
      </ul>
    </div>
  );
};
