import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ImportOptions } from './types';
import { Alert } from '../../../common/Alert';

export const ImportForm: React.FC = () => {
  const [selectedPool, setSelectedPool] = useState('');
  const [poolName, setPoolName] = useState('');
  const [options, setOptions] = useState<ImportOptions>({
    readonly: false,
    missingLog: false,
    withoutMount: false,
    mountAs: false,
    forceImport: false,
    checkpoint: false,
  });
  const [mountPath, setMountPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPool) {
      setError('Please select a pool to import');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // API call would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(`Pool "${selectedPool}" imported successfully${poolName ? ` as "${poolName}"` : ''}`);
      setSelectedPool('');
      setPoolName('');
    } catch (err: any) {
      setError(err.message || 'Failed to import the pool');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-[#1575C5] text-white px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold">Pool Import</h2>
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
              <option value="">Select a pool to import</option>
              <option value="pool1">pool1</option>
              <option value="Pool0">Pool0</option>
              <option value="rpool">rpool</option>
              <option value="t1">t1</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Import As
            </label>
            <input
              type="text"
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              placeholder="Enter new name for the imported pool"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Import Options
            </label>
            
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.readonly}
                  onChange={(e) => setOptions({ ...options, readonly: e.target.checked })}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <span className="ml-2 text-sm text-gray-700">Import Read-Only (-readonly)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.missingLog}
                  onChange={(e) => setOptions({ ...options, missingLog: e.target.checked })}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <span className="ml-2 text-sm text-gray-700">Import with Missing Log Device (-m)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.withoutMount}
                  onChange={(e) => setOptions({ ...options, withoutMount: e.target.checked })}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <span className="ml-2 text-sm text-gray-700">Without Mount (-N)</span>
              </label>

              <div className="pl-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={options.mountAs}
                    onChange={(e) => setOptions({ ...options, mountAs: e.target.checked })}
                    className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                  />
                  <span className="ml-2 text-sm text-gray-700">Mount As (-R)</span>
                </label>
                {options.mountAs && (
                  <input
                    type="text"
                    value={mountPath}
                    onChange={(e) => setMountPath(e.target.value)}
                    placeholder="Enter mount path"
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
                  />
                )}
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.forceImport}
                  onChange={(e) => setOptions({ ...options, forceImport: e.target.checked })}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <span className="ml-2 text-sm text-gray-700">Import Former State of Damaged Pool (-F)</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={options.checkpoint}
                  onChange={(e) => setOptions({ ...options, checkpoint: e.target.checked })}
                  className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
                />
                <span className="ml-2 text-sm text-gray-700">Restore a System Checkpoint (-rewind-to-checkpoint)</span>
              </label>
            </div>
          </div>

          {options.forceImport && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Warning: Forcing import of a damaged pool may cause data loss. Last changes might be lost!
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1575C5] hover:bg-[#1266AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1575C5] disabled:opacity-50"
          >
            {loading ? 'Importing...' : 'Import Pool'}
          </button>
        </form>
      </div>
    </div>
  );
};
