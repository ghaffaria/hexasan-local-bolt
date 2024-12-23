import React from 'react';
import { AddToDatapool } from './AddToDatapool';
import { DiskTable } from './DiskTable';
import { PoolStatus } from './PoolStatus';

const ExtendPool: React.FC = () => {
  return (
    <div className="space-y-6">
      <AddToDatapool />
      <DiskTable />
      <PoolStatus />
    </div>
  );
};

export default ExtendPool;
