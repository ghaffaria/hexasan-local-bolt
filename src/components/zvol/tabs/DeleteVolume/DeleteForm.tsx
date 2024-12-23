import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Pool, Volume } from './types';
import { Alert } from '../../../common/Alert';
import { ConfirmationModal } from './ConfirmationModal';

const mockPools: Pool[] = [
  {
    name: 'Pool0',
    volumes: [
      { name: 'vol1', pool: 'Pool0', used: '1.2G', available: '22.7G', referenced: '1.0G', mountpoint: '-', hasSnapshots: true, hasClones: false },
      { name: 'vol2', pool: 'Pool0', used: '2.5G', available: '21.4G', referenced: '2.3G', mountpoint: '-', hasSnapshots: false, hasClones: true },
    ],
  },
  {
    name: 'rpool',
    volumes: [
      { name: 'vol3', pool: 'rpool', used: '5.1G', available: '94.9G', referenced: '5.0G', mountpoint: '-', hasSnapshots: false, hasClones: false },
    ],
  },
];

export const DeleteForm: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState('');
  const [selectedVolume, setSelectedVolume] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedPoolData = mockPools.find(pool => pool.name === selectedPool);
  const selectedVolumeData = selectedPoolData?.volumes.find(vol => vol.name === selectedVolume);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Volume "${selectedVolume}" has been deleted successfully.`);
      setSelectedVolume('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete the volume');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-[#1575C5] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Delete Volume</h2>
      </div>

      <div className="p-6">
        {error && <Alert type="error" message={error} className="mb-6" />}
        {success && <Alert type="success" message={success} className="mb-6" />}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Pool <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedPool}
              onChange={(e) => {
                setSelectedPool(e.target.value);
                setSelectedVolume('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="">Select a pool</option>
              {mockPools.map((pool) => (
                <option key={pool.name} value={pool.name}>{pool.name}</option>
              ))}
            </select>
          </div>

          {selectedPool && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Volume <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedVolume}
                onChange={(e) => setSelectedVolume(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
              >
                <option value="">Select a volume</option>
                {selectedPoolData?.volumes.map((volume) => (
                  <option key={volume.name} value={volume.name}>{volume.name}</option>
                ))}
              </select>
            </div>
          )}

          {selectedVolumeData && (selectedVolumeData.hasSnapshots || selectedVolumeData.hasClones) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This volume has {selectedVolumeData.hasSnapshots ? 'snapshots' : ''} 
                    {selectedVolumeData.hasSnapshots && selectedVolumeData.hasClones ? ' and ' : ''}
                    {selectedVolumeData.hasClones ? 'clones' : ''} that will also be deleted.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedVolume && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    Warning: Deleting a volume will result in permanent data loss. This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={!selectedPool || !selectedVolume || loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
          >
            {loading ? 'Deleting...' : 'Delete Volume'}
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        volumeName={selectedVolume}
        hasSnapshots={selectedVolumeData?.hasSnapshots || false}
        hasClones={selectedVolumeData?.hasClones || false}
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
    </div>
  );
};
