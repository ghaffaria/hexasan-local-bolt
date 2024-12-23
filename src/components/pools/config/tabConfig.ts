import { 
  Plus,
  Expand,
  Import as ImportIcon,
  LogOut,
  Trash2,
  Minimize2,
  Settings,
  History,
  Info,
  BarChart2,
  Lock
} from 'lucide-react';

export const poolTabs = [
  { id: 'create', label: 'Create Pool', icon: Plus },
  { id: 'extend', label: 'Extend Pool', icon: Expand },
  { id: 'import', label: 'Import', icon: ImportIcon },
  { id: 'export', label: 'Export', icon: LogOut },
  { id: 'destroy', label: 'Destroy', icon: Trash2 },
  { id: 'shrink', label: 'Shrink Pool', icon: Minimize2 },
  { id: 'features', label: 'Features', icon: Settings },
  { id: 'history', label: 'History', icon: History },
  { id: 'info', label: 'Pool Info', icon: Info },
  { id: 'benchmarks', label: 'Benchmarks', icon: BarChart2 },
  { id: 'encrypt', label: 'Encrypt Pool on Files', icon: Lock },
] as const;
