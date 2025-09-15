import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, User } from '../types';

// User storage key
const USERS_STORAGE_KEY = 'snm_users';
const CURRENT_USER_KEY = 'snm_current_user';

// Interface for stored user data
interface StoredUser extends User {
  password: string;
  meetings: any[];
  tasks: any[];
  createdAt: string;
}

// Helper functions for localStorage
const getStoredUsers = (): Record<string, StoredUser> => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  return users ? JSON.parse(users) : {};
};

const saveStoredUsers = (users: Record<string, StoredUser>) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

const findUserByEmailOrUsername = (identifier: string): StoredUser | null => {
  const users = getStoredUsers();
  const userKey = Object.keys(users).find(key => 
    users[key].email.toLowerCase() === identifier.toLowerCase() || 
    users[key].name.toLowerCase() === identifier.toLowerCase()
  );
  return userKey ? users[userKey] : null;
};

const generateUserId = (): string => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUserId = localStorage.getItem(CURRENT_USER_KEY);
    if (currentUserId) {
      const users = getStoredUsers();
      const userData = users[currentUserId];
      if (userData) {
        setUser({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          avatar: userData.avatar
        });
      } else {
        // Clean up invalid session
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  }, []);

  const login = async (emailOrUsername: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = findUserByEmailOrUsername(emailOrUsername);
    
    if (!existingUser) {
      return false; // User not found
    }
    
    if (existingUser.password !== password) {
      return false; // Invalid password
    }
    
    // Successful login
    const userSession: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      avatar: existingUser.avatar
    };
    
    setUser(userSession);
    localStorage.setItem(CURRENT_USER_KEY, existingUser.id);
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = findUserByEmailOrUsername(email);
    if (existingUser) {
      return false; // User already exists
    }
    
    // Check if username is taken
    const existingUserByName = findUserByEmailOrUsername(name);
    if (existingUserByName) {
      return false; // Username already taken
    }
    
    const userId = generateUserId();
    const users = getStoredUsers();
    
    const newStoredUser: StoredUser = {
      id: userId,
      email,
      name,
      password,
      avatar: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1`,
      meetings: [],
      tasks: [],
      createdAt: new Date().toISOString()
    };
    
    users[userId] = newStoredUser;
    saveStoredUsers(users);
    
    // Auto-login after signup
    const userSession: User = {
      id: newStoredUser.id,
      email: newStoredUser.email,
      name: newStoredUser.name,
      avatar: newStoredUser.avatar
    };
    
    setUser(userSession);
    localStorage.setItem(CURRENT_USER_KEY, userId);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    // Keep users data but remove current session
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};