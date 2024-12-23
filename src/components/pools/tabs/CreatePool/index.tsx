import React from 'react';
import { CreateForm } from './CreateForm';
import { PoolList } from './PoolList';

const CreatePool: React.FC = () => {
  return (
    <div className="space-y-6">
      <CreateForm />
      <PoolList />
    </div>
  );
}

export default CreatePool;
