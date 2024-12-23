import React from 'react';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // This is a placeholder component
  // In a real implementation, you would use a charting library
  return (
    <div className="relative w-full h-48">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-700">
            {data[0].value}%
          </div>
          <div className="text-sm text-gray-500">Used Space</div>
        </div>
      </div>
    </div>
  );
};
