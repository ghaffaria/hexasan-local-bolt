import React from 'react';
import { RecentActivity } from './RecentActivity';
import { Activity } from '../../../types';

const recentActivities: Activity[] = [
  { action: 'Created Pool', target: 'rpool', time: '12:00 PM' },
  { action: 'Added Zvol', target: 'zvol1', details: 'Pool rpool', time: '12:30 PM' },
  { action: 'Started Scrub', target: 'p1', time: '1:00 PM' },
];

export const RecentActivities: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-medium text-gray-700 mb-3">Recent Activities</h2>
      <ul className="space-y-2">
        {recentActivities.map((activity, index) => (
          <RecentActivity key={index} activity={activity} />
        ))}
      </ul>
    </div>
  );
};
