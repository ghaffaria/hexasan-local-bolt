import React from 'react';
import { StorageOverview } from './cards/StorageOverview';
import { PerformanceStats } from './cards/PerformanceStats';
import { SystemStatus } from './cards/SystemStatus';
import { RecentActivities } from './activities/RecentActivities';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="text-lg font-semibold text-black">
        Welcome to HexaSAN Storage Management System
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-3 gap-6">
        <StorageOverview />
        <PerformanceStats />
        <SystemStatus />
      </div>

      {/* Recent Activities and System Status */}
      <div className="grid grid-cols-2 gap-6">
        <RecentActivities />
        <SystemStatus />
      </div>
    </div>
  );
};
