import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Pool } from './types';
import { Alert } from '../../../common/Alert';
import { ConfirmationModal } from './ConfirmationModal';

const mockPools: Pool[] = [
  { name: 'Pool0', state: 'ONLINE', status: 'HEALTHY', hasActiveShares: false, hasActiveTargets: false },
  { name: 'rpool', state: 'ONLINE', status: 'HEALTHY', hasActiveShares: true, hasActiveTargets: false },
  { name: 't1', state: 'OFFLINE', status: 'DEGRADED', hasActiveShares: false, hasActiveTargets: true },
];

export const DestroyForm: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedPoolData = mockPools.find(pool => pool.name === selectedPool);

  const handleDestroy = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Pool "${selectedPool}" has been destroyed successfully.`);
      setSelectedPool('');
    } catch (err: any) {
      setError(err.message || 'Failed to destroy the pool');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const canDestroy = selectedPoolData && !selectedPoolData.hasActiveShares && !selectedPoolData.hasActiveTargets;

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-[#1575C5] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Destroy Pool</h2>
      </div>

      <div className="p-6">
        {error && <Alert type="error" message={error} className="mb-6" />}
        {success && <Alert type="success" message={success} className="mb-6" />}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Pool to Destroy <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="">Select a pool</option>
              {mockPools.map((pool) => (
                <option key={pool.name} value={pool.name}>{pool.name}</option>
              ))}
            </select>
          </div>

          {selectedPoolData && !canDestroy && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This pool cannot be destroyed because it has {selectedPoolData.hasActiveShares ? 'active shares' : 'active targets'}.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedPool && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Warning: Destroying a pool will result in permanent data loss. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={!canDestroy || !selectedPool || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Destroying...' : 'Destroy Pool'}
          </button>

          <p className="text-sm text-gray-600">
            Note: Destroyed pools can be reimported if necessary.
          </p>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        poolName={selectedPool}
        onConfirm={handleDestroy}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
};
