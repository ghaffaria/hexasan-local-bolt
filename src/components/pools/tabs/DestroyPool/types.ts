export interface Pool {
  name: string;
  state: 'ONLINE' | 'OFFLINE';
  status: 'HEALTHY' | 'DEGRADED' | 'FAULTED';
  hasActiveShares: boolean;
  hasActiveTargets: boolean;
}

export interface DestroyPoolFormData {
  poolName: string;
}
