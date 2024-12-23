export type ZvolTabType = 'create' | 'modify' | 'delete' | 'filesystems' | 'help';

export interface ZvolFormData {
  pool: string;
  parentFilesystem: string;
  name: string;
  size: string;
  sizeUnit: 'MiB' | 'GiB' | 'TiB';
  blockSize: '32KB' | '64KB' | '128KB';
  thinProvisioned: boolean;
}

export interface Zvol {
  name: string;
  pool: string;
  size: string;
  used: string;
  available: string;
  deduplication: boolean;
  health: 'ONLINE' | 'DEGRADED' | 'FAULTED';
}
