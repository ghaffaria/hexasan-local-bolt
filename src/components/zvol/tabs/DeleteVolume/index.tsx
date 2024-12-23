import React from 'react';
import { DeleteForm } from './DeleteForm';
import { VolumeList } from './VolumeList';

const DeleteVolume: React.FC = () => {
  return (
    <div className="space-y-6">
      <DeleteForm />
      <VolumeList />
    </div>
  );
};

export default DeleteVolume;
