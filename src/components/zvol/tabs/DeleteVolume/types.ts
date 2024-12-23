export interface Volume {
  name: string;
  pool: string;
  used: string;
  available: string;
  referenced: string;
  mountpoint: string;
  hasSnapshots: boolean;
  hasClones: boolean;
}

export interface Pool {
  name: string;
  volumes: Volume[];
}
