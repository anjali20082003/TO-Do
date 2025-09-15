import React from 'react';
import { Calendar, Clock, Edit3, Trash2, Check, X } from 'lucide-react';
import { format, isAfter, isToday, isTomorrow } from 'date-fns';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getDeadlineStatus = () => {
    const deadline = new Date(task.deadline);
    if (isToday(deadline)) return { text: 'Today', color: 'text-orange-600 dark:text-orange-400' };
    if (isTomorrow(deadline)) return { text: 'Tomorrow', color: 'text-blue-600 dark:text-blue-400' };
    if (isAfter(new Date(), deadline)) return { text: 'Overdue', color: 'text-red-600 dark:text-red-400' };
    return { text: format(deadline, 'MMM dd'), color: 'text-gray-600 dark:text-gray-400' };
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-200 animate-fade-in ${
      task.completed ? 'opacity-75' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggleComplete(task.id)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              task.completed
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
            }`}
          >
            {task.completed && <Check className="w-3 h-3" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-lg font-heading mb-2 ${
              task.completed
                ? 'line-through text-gray-500 dark:text-gray-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
            
            <p className={`text-sm mb-3 ${
              task.completed
                ? 'text-gray-400 dark:text-gray-500'
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {task.description}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
          
          <div className={`flex items-center space-x-1 text-sm ${deadlineStatus.color}`}>
            <Calendar className="w-4 h-4" />
            <span>{deadlineStatus.text}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{format(new Date(task.createdAt), 'MMM dd')}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;