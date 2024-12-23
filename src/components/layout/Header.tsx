import React from 'react';
import { RefreshCw, Plus, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <RefreshCw size={18} className="mr-2" />
          Rescan
        </button>
        <button className="flex items-center px-4 py-2 bg-[#1575C5] text-white hover:bg-[#1266AE] rounded-lg">
          <Plus size={18} className="mr-2" />
          Add Zpool
        </button>
      </div>

      <div className="relative">
        <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <User size={18} className="mr-2" />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
