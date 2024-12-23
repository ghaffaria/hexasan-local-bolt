import React from 'react';
import { PieChart } from '../../common/charts/PieChart';

export const StorageOverview: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-medium text-gray-700 mb-3">Storage Overview</h2>
      <PieChart
        data={[
          { label: 'Used', value: 35, color: '#1575C5' },
          { label: 'Free', value: 65, color: '#D1D5DB' },
        ]}
      />
      <div className="text-sm mt-4">
        <p>Total: <b>100 TB</b></p>
        <p>Used: <b>35 TB</b></p>
        <p>Free: <b>65 TB</b></p>
      </div>
    </div>
  );
};
