import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { CreatePoolFormData, DiskOption } from './types';
import { Alert } from '../../../common/Alert';

export const CreateForm: React.FC = () => {
  const [form, setForm] = useState<CreatePoolFormData>({
    poolName: '',
    zfsVersion: 'default',
    selectedDisks: [],
    vdevType: 'basic',
    useOverflow: true
  });
  
  const [availableDisks, setAvailableDisks] = useState<DiskOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailableDisks();
  }, []);

  const fetchAvailableDisks = async () => {
    try {
      const response = await fetch('http://10.0.51.89:5555/api/storage/disks/');
      if (!response.ok) throw new Error('Failed to fetch disks');
      const disks = await response.json();
      setAvailableDisks(disks);
    } catch (err: any) {
      setError('Failed to load available disks');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://10.0.51.89:5555/api/storage/pools/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create pool');
      }

      const data = await response.json();
      setSuccess(data.message);
      setForm({
        poolName: '',
        zfsVersion: 'default',
        selectedDisks: [],
        vdevType: 'basic',
        useOverflow: true
      });
      
      // Refresh available disks after pool creation
      fetchAvailableDisks();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Storage Pool</h2>

      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pool Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pool Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.poolName}
            onChange={(e) => setForm({ ...form, poolName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            required
          />
        </div>

        {/* ZFS Version */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ZFS Version
          </label>
          <select
            value={form.zfsVersion}
            onChange={(e) => setForm({ ...form, zfsVersion: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
          >
            <option value="default">Default</option>
            <option value="28">Version 28</option>
            <option value="5000">Version 5000</option>
          </select>
        </div>

        {/* Disk Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Disks <span className="text-red-500">*</span>
          </label>
          <div className="border rounded-md divide-y">
            {availableDisks.map((disk) => (
              <div key={disk.id} className="flex items-center p-3">
                <input
                  type="checkbox"
                  id={disk.id}
                  checked={form.selectedDisks.includes(disk.id)}
                  onChange={(e) => {
                    const newSelectedDisks = e.target.checked
                      ? [...form.selectedDisks, disk.id]
                      : form.selectedDisks.filter(id => id !== disk.id);
                    setForm({ ...form, selectedDisks: newSelectedDisks });
                  }}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <label htmlFor={disk.id} className="ml-3 flex-1">
                  <div className="text-sm font-medium text-gray-700">
                    {disk.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {disk.id} • Status: {disk.status}
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* VDEV Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type of VDEV
          </label>
          <select
            value={form.vdevType}
            onChange={(e) => setForm({ ...form, vdevType: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
          >
            <option value="basic">Basic</option>
            <option value="mirror">Mirror</option>
            <option value="raidz1">RAID-Z1</option>
            <option value="raidz2">RAID-Z2</option>
            <option value="raidz3">RAID-Z3</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || form.selectedDisks.length === 0}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1575C5] hover:bg-[#1266AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1575C5] disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Pool'}
        </button>
      </form>
    </div>
  );
};
