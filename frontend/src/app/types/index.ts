export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface Train {
  id: number;
  trainCode: string;
  route: string;
  status: string;
}

export interface TrainEvent {
  id?: number;
  trainCode: string;
  eventType: string;
  status?: string;
  details?: string;
  payload?: string;
  createdAt?: string;
}

export interface Incident {
  id: number;
  trainCode: string;
  severity: string;
  summary: string;
  details: string;
  status: string;
  openedAt: string;
  resolvedAt?: string;
}
