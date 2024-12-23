import React from 'react';
import { DestroyForm } from './DestroyForm';
import { PoolList } from './PoolList';

const DestroyPool: React.FC = () => {
  return (
    <div className="space-y-6">
      <DestroyForm />
      <PoolList />
    </div>
  );
};

export default DestroyPool;
