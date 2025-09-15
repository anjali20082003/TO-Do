import { useEffect, useState } from 'react';
import { Task, TaskFilter } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Storage keys
const USERS_STORAGE_KEY = 'snm_users';

// Helper functions for user data management
const getUserData = (userId: string) => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  if (!users) return null;
  const usersData = JSON.parse(users);
  return usersData[userId] || null;
};

const saveUserData = (userId: string, userData: any) => {
  const users = localStorage.getItem(USERS_STORAGE_KEY);
  const usersData = users ? JSON.parse(users) : {};
  usersData[userId] = userData;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usersData));
};

export const useTasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user) {
      const userData = getUserData(user.id);
      if (userData && userData.tasks) {
        setTasks(userData.tasks);
      }
    } else {
      setTasks([]);
    }
  }, [user]);

  const saveTasks = (newTasks: Task[]) => {
    if (!user) return;
    
    const userData = getUserData(user.id);
    if (userData) {
      userData.tasks = newTasks;
      userData.updatedAt = new Date().toISOString();
      saveUserData(user.id, userData);
    }
    setTasks(newTasks);
  };

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'completed'>) => {
    if (!user) return;
    
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: user.id,
    };

    const newTasks = [...tasks, newTask];
    saveTasks(newTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const newTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    saveTasks(newTasks);
  };

  const toggleTaskComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      case 'high':
      case 'medium':
      case 'low':
        return task.priority === filter;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0,
  };

  return {
    tasks: filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    stats,
  };
};