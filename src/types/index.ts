export type ServiceStatus = 'running' | 'warning' | 'critical' | 'stopped';

export interface SystemService {
  name: string;
  status: ServiceStatus;
}

export interface Activity {
  action: string;
  target: string;
  details?: string;
  time: string;
}

export interface SidebarItem {
  title: string;
  icon: string;
  path: string;
  children?: SidebarItem[];
}

export interface SystemStatus {
  cpu: number;
  memory: number;
  storage: number;
}
