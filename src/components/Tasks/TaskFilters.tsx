import React from 'react';
import { TaskFilter } from '../../types';

interface TaskFiltersProps {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({ activeFilter, onFilterChange, stats }) => {
  const filters: { value: TaskFilter; label: string; count?: number }[] = [
    { value: 'all', label: 'All Tasks', count: stats.total },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'completed', label: 'Completed', count: stats.completed },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label, count }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeFilter === value
              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {label}
          {count !== undefined && (
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              activeFilter === value
                ? 'bg-white bg-opacity-20'
                : 'bg-gray-200 dark:bg-gray-600'
            }`}>
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters;