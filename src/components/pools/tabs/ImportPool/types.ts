export interface ImportOptions {
  readonly: boolean;
  missingLog: boolean;
  withoutMount: boolean;
  mountAs: boolean;
  mountPath?: string;
  forceImport: boolean;
  checkpoint: boolean;
}

export interface Pool {
  name: string;
  state: 'ONLINE' | 'OFFLINE' | 'DESTROYED';
  status: 'HEALTHY' | 'DEGRADED' | 'FAULTED';
  lastSeen?: string;
  config?: string;
}
