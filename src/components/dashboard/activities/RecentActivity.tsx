import React from 'react';
import { Activity } from '../../../types';

interface RecentActivityProps {
  activity: Activity;
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ activity }) => {
  return (
    <li className="text-sm">
      {activity.action} <b>{activity.target}</b>
      {activity.details && <span> to {activity.details}</span>}
      <span className="text-gray-500 ml-2">({activity.time})</span>
    </li>
  );
};
