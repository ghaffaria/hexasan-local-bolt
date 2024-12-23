import React, { useState, useEffect } from 'react';
import { Pool } from './types';

export const PoolList: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      const response = await fetch('http://10.0.51.89:5555/api/storage/pools/');
      if (!response.ok) throw new Error('Failed to fetch pools');
      const data = await response.json();
      setPools(data);
    } catch (err: any) {
      setError('Failed to load pools');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-gray-500">Loading pools...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="bg-gray-100 px-6 py-4 rounded-t-lg">
        <h2 className="text-xl font-semibold text-gray-900">Existing Pools</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Free</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pools.map((pool) => (
              <tr key={pool.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pool.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.allocated}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.free}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pool.health}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
