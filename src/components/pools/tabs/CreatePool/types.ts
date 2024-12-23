export interface DiskOption {
  id: string;
  serial: string;
  size: string;
  status: 'available' | 'in-use';
}

export interface CreatePoolFormData {
  poolName: string;
  zfsVersion: string;
  selectedDisks: string[];
  vdevType: string;
  useOverflow: boolean;
}

export interface Pool {
  name: string;
  size: string;
  allocated: string;
  free: string;
  health: 'ONLINE' | 'DEGRADED' | 'FAULTED';
}
