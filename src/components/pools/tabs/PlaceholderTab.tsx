import React from 'react';
import { Clock } from 'lucide-react';

interface PlaceholderTabProps {
  title: string;
}

const PlaceholderTab: React.FC<PlaceholderTabProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <Clock className="h-16 w-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md">
        This feature will be available in future updates. Stay tuned for enhanced storage management capabilities.
      </p>
    </div>
  );
};

export default PlaceholderTab;
