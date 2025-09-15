export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  participants: string[];
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (emailOrUsername: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export type TaskFilter = 'all' | 'pending' | 'completed' | 'high' | 'medium' | 'low';