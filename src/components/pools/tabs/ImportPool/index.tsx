import React from 'react';
import { ImportForm } from './ImportForm';
import { PoolList } from './PoolList';

const ImportPool: React.FC = () => {
  return (
    <div className="space-y-6">
      <ImportForm />
      <PoolList />
    </div>
  );
};

export default ImportPool;
