import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface DiskOption {
  id: string;
  serial: string;
  size: string;
  status: 'available' | 'in-use';
}

const mockDisks: DiskOption[] = [
  { id: 'disk1', serial: 'WD-WCC6Y2RK9RPX', size: '2TB', status: 'available' },
  { id: 'disk2', serial: 'WD-WCC6Y2RK9RPY', size: '2TB', status: 'available' },
  { id: 'disk3', serial: 'WD-WCC6Y2RK9RPZ', size: '2TB', status: 'available' },
];

const CreatePool: React.FC = () => {
  const [poolName, setPoolName] = useState('');
  const [zfsVersion, setZfsVersion] = useState('default');
  const [selectedDisks, setSelectedDisks] = useState<string[]>([]);
  const [vdevType, setVdevType] = useState('basic');
  const [useOverflow, setUseOverflow] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      poolName,
      zfsVersion,
      selectedDisks,
      vdevType,
      useOverflow,
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Storage Pool</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Pool Name */}
          <div>
            <label htmlFor="poolName" className="block text-sm font-medium text-gray-700">
              Pool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="poolName"
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
              placeholder="Enter pool name"
              required
            />
          </div>

          {/* ZFS Version */}
          <div>
            <label htmlFor="zfsVersion" className="block text-sm font-medium text-gray-700">
              ZFS Version
            </label>
            <select
              id="zfsVersion"
              value={zfsVersion}
              onChange={(e) => setZfsVersion(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="default">Default</option>
              <option value="14">Version 14</option>
              <option value="15">Version 15</option>
              <option value="19">Version 19</option>
              <option value="21">Version 21</option>
              <option value="28v5">Version 28v5</option>
            </select>
          </div>

          {/* Disk Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Disks
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
                      {disk.serial}
                    </div>
                    <div className="text-sm text-gray-500">
                      {disk.size} • {disk.status}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* VDEV Type */}
          <div>
            <label htmlFor="vdevType" className="block text-sm font-medium text-gray-700">
              Type of VDEV
            </label>
            <select
              id="vdevType"
              value={vdevType}
              onChange={(e) => setVdevType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#1575C5] focus:ring focus:ring-[#1575C5] focus:ring-opacity-50"
            >
              <option value="basic">Basic</option>
              <option value="mirror">Mirror</option>
              <option value="raidz1">RAID-Z1</option>
              <option value="raidz2">RAID-Z2</option>
              <option value="raidz3">RAID-Z3</option>
            </select>
          </div>

          {/* Overflow Protection */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="overflow"
              checked={useOverflow}
              onChange={(e) => setUseOverflow(e.target.checked)}
              className="h-4 w-4 text-[#1575C5] focus:ring-[#1575C5]"
            />
            <label htmlFor="overflow" className="ml-2 block text-sm text-gray-700">
              Use overflow protection (recommended)
            </label>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Creating a new storage pool will format the selected disks. Make sure you have backed up any important data.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1575C5] hover:bg-[#1266AE] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1575C5]"
            >
              Create Pool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePool;
