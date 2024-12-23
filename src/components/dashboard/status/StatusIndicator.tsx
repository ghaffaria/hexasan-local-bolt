import React from 'react';
import { ServiceStatus } from '../../../types';

interface StatusIndicatorProps {
  status: ServiceStatus;
}

const statusColors: Record<ServiceStatus, string> = {
  running: 'text-green-500',
  warning: 'text-yellow-500',
  critical: 'text-red-500',
  stopped: 'text-gray-500',
};

const statusLabels: Record<ServiceStatus, string> = {
  running: 'Running',
  warning: 'Warning',
  critical: 'Critical',
  stopped: 'Stopped',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <span className={statusColors[status]}>
      {statusLabels[status]}
    </span>
  );
};
