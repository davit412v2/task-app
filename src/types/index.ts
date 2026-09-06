export interface User {
  id: number;
  userName: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  projectId: number;
  status: string;
  priority: string;
}