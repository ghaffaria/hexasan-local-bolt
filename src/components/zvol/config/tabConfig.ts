import { 
  Plus, 
  Edit, 
  Trash2, 
  FolderTree, 
  HelpCircle 
} from 'lucide-react';

export const zvolTabs = [
  { id: 'create', label: 'Create Volume', icon: Plus },
  { id: 'modify', label: 'Modify Volume', icon: Edit },
  { id: 'delete', label: 'Delete Volume', icon: Trash2 },
  { id: 'filesystems', label: 'Filesystems', icon: FolderTree },
  { id: 'help', label: 'Help', icon: HelpCircle },
] as const;
