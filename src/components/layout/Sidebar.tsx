import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  Target,
  Users,
  History,
  Network,
  Settings,
  ChevronDown,
  ChevronRight,
  Cog,
} from 'lucide-react';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  to?: string;
  children?: { title: string; path: string }[];
  isOpen?: boolean;
  onToggle?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  icon,
  to,
  children,
  isOpen,
  onToggle,
}) => {
  const location = useLocation();
  const isActive = to ? location.pathname === to : children?.some(child => location.pathname === child.path);

  if (!children) {
    return (
      <NavLink
        to={to || '#'}
        className={({ isActive }) => `
          w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg
          ${isActive ? 'bg-gray-700' : ''}
        `}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1">{title}</span>
      </NavLink>
    );
  }

  return (
    <div className="mb-2">
      <button
        onClick={onToggle}
        className={`
          w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg
          ${isActive ? 'bg-gray-700' : ''}
        `}
      >
        <span className="mr-3">{icon}</span>
        <span className="flex-1 text-left">{title}</span>
        <span className="ml-auto">
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>
      {children && isOpen && (
        <div className="ml-12 mt-2 space-y-2">
          {children.map((child) => (
            <NavLink
              key={child.title}
              to={child.path}
              className={({ isActive }) => `
                w-full block text-left px-4 py-2 text-sm text-gray-400 
                hover:text-gray-200 hover:bg-gray-600 rounded-lg
                ${isActive ? 'bg-gray-600 text-gray-200' : ''}
              `}
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-64 h-screen bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-gray-300">HexaSAN</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <SidebarItem
          title="Dashboard"
          icon={<LayoutDashboard size={20} />}
          to="/dashboard"
        />

        <SidebarItem
          title="Storage Management"
          icon={<Database size={20} />}
          isOpen={openSections['storage']}
          onToggle={() => toggleSection('storage')}
          children={[
            { title: 'Pools', path: '/storage/pools' },
            { title: 'Zvols', path: '/storage/zvols' },
            { title: 'Snapshots', path: '/storage/snapshots' },
          ]}
        />

        <SidebarItem
          title="Targets"
          icon={<Target size={20} />}
          isOpen={openSections['targets']}
          onToggle={() => toggleSection('targets')}
          children={[
            { title: 'iSCSI Targets', path: '/targets/iscsi' },
            { title: 'FC Targets', path: '/targets/fc' },
          ]}
        />

        <SidebarItem
          title="User Management"
          icon={<Users size={20} />}
          isOpen={openSections['users']}
          onToggle={() => toggleSection('users')}
          children={[
            { title: 'Users', path: '/users' },
            { title: 'Roles & Permissions', path: '/roles' },
          ]}
        />

        <SidebarItem
          title="Backup & Recovery"
          icon={<History size={20} />}
          to="/backup"
        />

        <SidebarItem
          title="Network Tools"
          icon={<Network size={20} />}
          isOpen={openSections['network']}
          onToggle={() => toggleSection('network')}
          children={[
            { title: 'Virtual IPs', path: '/network/vips' },
            { title: 'Network Interfaces', path: '/network/interfaces' },
          ]}
        />

        <SidebarItem
          title="Advanced Settings"
          icon={<Settings size={20} />}
          isOpen={openSections['advanced']}
          onToggle={() => toggleSection('advanced')}
          children={[
            { title: 'System Logs', path: '/logs' },
            { title: 'Performance Tuning', path: '/tuning' },
          ]}
        />

        <SidebarItem
          title="System Settings"
          icon={<Cog size={20} />}
          isOpen={openSections['system']}
          onToggle={() => toggleSection('system')}
          children={[
            { title: 'Services Status', path: '/services' },
            { title: 'Diagnostics', path: '/diagnostics' },
          ]}
        />
      </div>

      <div className="p-4 border-t border-gray-700">
        <p className="text-xs text-gray-300 text-center">Powered by Pardisco</p>
      </div>
    </div>
  );
};

export default Sidebar;
