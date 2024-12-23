import React, { useState } from 'react';
import { ZvolFormData } from '../../types';
import { Alert } from '../../../common/Alert';

const initialFormData: ZvolFormData = {
  pool: '',
  parentFilesystem: '',
  name: '',
  size: '',
  sizeUnit: 'GiB',
  blockSize: '64KB',
  thinProvisioned: true,
};

export const VolumeForm: React.FC = () => {
  const [form, setForm] = useState<ZvolFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Zvol "${form.name}" created successfully in pool "${form.pool}".`);
      setForm(initialFormData);
    } catch (err: any) {
      setError(err.message || 'Failed to create the volume.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Volume</h2>

      {error && <Alert type="error" message={error} className="mb-4" />}
      {success && <Alert type="success" message={success} className="mb-4" />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pool <span className="text-red-500">*</span>
          </label>
          <select
            value={form.pool}
            onChange={(e) => setForm({ ...form, pool: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            required
          >
            <option value="">Select a pool</option>
            <option value="pool1">Pool 1</option>
            <option value="pool2">Pool 2</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parent Filesystem
          </label>
          <input
            type="text"
            value={form.parentFilesystem}
            onChange={(e) => setForm({ ...form, parentFilesystem: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            placeholder="Optional parent filesystem"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Volume Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Size Unit
            </label>
            <select
              value={form.sizeUnit}
              onChange={(e) => setForm({ ...form, sizeUnit: e.target.value as any })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="MiB">MiB</option>
              <option value="GiB">GiB</option>
              <option value="TiB">TiB</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Block Size
          </label>
          <select
            value={form.blockSize}
            onChange={(e) => setForm({ ...form, blockSize: e.target.value as any })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
          >
            <option value="32KB">32KB</option>
            <option value="64KB">64KB</option>
            <option value="128KB">128KB</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="thinProvisioned"
            checked={form.thinProvisioned}
            onChange={(e) => setForm({ ...form, thinProvisioned: e.target.checked })}
            className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
          />
          <label htmlFor="thinProvisioned" className="ml-2 block text-sm text-gray-700">
            Use thin provisioning (recommended)
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1575C5] hover:bg-[#1266AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1575C5] disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Volume'}
        </button>
      </form>
    </div>
  );
};
