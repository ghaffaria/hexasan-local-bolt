import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { DiskType, VdevAllowance, Disk } from './types';
import { Alert } from '../../../common/Alert';

const mockDisks: Disk[] = [
  { id: 'disk1', vendor: 'WD', product: 'WD2003FYPS', revision: '1.0', capacity: '2TB', pool: null },
  { id: 'disk2', vendor: 'Seagate', product: 'ST2000NM0011', revision: '1.0', capacity: '2TB', pool: null },
];

export const AddToDatapool: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState('');
  const [selectedDisks, setSelectedDisks] = useState<string[]>([]);
  const [diskType, setDiskType] = useState<DiskType>('spare');
  const [partition, setPartition] = useState('1');
  const [allowDifferentVdevs, setAllowDifferentVdevs] = useState<VdevAllowance>('no');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDisks.length === 0) {
      setError('Please select at least one disk');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('Disk(s) added successfully to the pool');
      setSelectedDisks([]);
    } catch (err: any) {
      setError(err.message || 'Failed to add disk(s) to the pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-[#1575C5] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Add to Datapool</h2>
      </div>

      <div className="p-6">
        {error && <Alert type="error" message={error} className="mb-6" />}
        {success && <Alert type="success" message={success} className="mb-6" />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Pool <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
              required
            >
              <option value="">Select a pool</option>
              <option value="pool1">Pool1</option>
              <option value="pool2">Pool2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Disks <span className="text-red-500">*</span>
            </label>
            <div className="border rounded-md divide-y">
              {mockDisks.map((disk) => (
                <div key={disk.id} className="flex items-center p-3">
                  <input
                    type="checkbox"
                    id={disk.id}
                    checked={selectedDisks.includes(disk.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDisks([...selectedDisks, disk.id]);
                      } else {
                        setSelectedDisks(selectedDisks.filter(id => id !== disk.id));
                      }
                    }}
                    className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                  />
                  <label htmlFor={disk.id} className="ml-3 flex-1">
                    <div className="text-sm font-medium text-gray-700">
                      {disk.vendor} {disk.product}
                    </div>
                    <div className="text-sm text-gray-500">
                      {disk.capacity} • {disk.pool || 'Available'}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Disk Type
            </label>
            <select
              value={diskType}
              onChange={(e) => setDiskType(e.target.value as DiskType)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="spare">Spare</option>
              <option value="basic">Basic</option>
              <option value="mirror">Mirror</option>
              <option value="raidz1">RAID-Z1</option>
              <option value="raidz2">RAID-Z2</option>
              <option value="raidz3">RAID-Z3</option>
              <option value="read-cache">Read Cache</option>
              <option value="write-log">Write Log</option>
              <option value="write-log-mirror">Write Log Mirror</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Partition Number for Single Slog or L2Arc
            </label>
            <select
              value={partition}
              onChange={(e) => setPartition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>p{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Allow Adding Different Vdev Types
            </label>
            <select
              value={allowDifferentVdevs}
              onChange={(e) => setAllowDifferentVdevs(e.target.value as VdevAllowance)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="no">No</option>
              <option value="all-but-basic">All but basic</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Adding disks to an existing pool will modify its structure. Make sure you understand the implications.
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1575C5] hover:bg-[#1266AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1575C5] disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add to Pool'}
          </button>
        </form>
      </div>
    </div>
  );
};
