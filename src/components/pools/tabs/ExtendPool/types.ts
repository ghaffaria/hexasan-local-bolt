export interface Disk {
  id: string;
  vendor: string;
  product: string;
  revision: string;
  capacity: string;
  pool: string | null;
}

export interface Pool {
  name: string;
  state: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  allocated: string;
  free: string;
  health: 'ONLINE' | 'DEGRADED' | 'FAULTED';
  scrubStatus: string;
}

export type DiskType = 
  | 'spare'
  | 'basic'
  | 'mirror'
  | 'raidz1'
  | 'raidz2'
  | 'raidz3'
  | 'read-cache'
  | 'write-log'
  | 'write-log-mirror';

export type VdevAllowance = 'no' | 'all-but-basic' | 'all';
