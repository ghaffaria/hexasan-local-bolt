import React from 'react';
import { LineChart } from '../../common/charts/LineChart';

export const PerformanceStats: React.FC = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-md font-medium text-gray-700 mb-3">Performance Statistics</h2>
      <LineChart
        data={[
          { label: 'Read', data: [100, 200, 300], color: '#1575C5' },
          { label: 'Write', data: [80, 120, 180], color: '#A3E635' },
        ]}
        labels={['12:00', '12:30', '1:00']}
      />
    </div>
  );
};
