import React from 'react';
import { VolumeForm } from './VolumeForm';
import { VolumeList } from './VolumeList';

export const CreateVolume: React.FC = () => {
  return (
    <div className="space-y-8">
      <VolumeForm />
      <VolumeList />
    </div>
  );
};
