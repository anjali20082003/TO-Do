import React from 'react';
import { CheckCircle2, Trophy, Calendar } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/Tasks/TaskCard';
import { Task } from '../types';
import toast from 'react-hot-toast';

const Completed: React.FC = () => {
  const { tasks, updateTask, deleteTask, toggleTaskComplete } = useTasks();
  
  const completedTasks = tasks.filter(task => task.completed);

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.success('Task deleted successfully!');
    }
  };

  const handleToggleComplete = (id: string) => {
    toggleTaskComplete(id);
    toast.success('Task marked as pending');
  };

  const handleEditTask = (task: Task) => {
    // For completed tasks, we'll redirect to main tasks page
    toast.info('Please go to Tasks page to edit this task');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <Trophy className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
            Completed Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Great job! You've completed {completedTasks.length} task{completedTasks.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Stats */}
      {completedTasks.length > 0 && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
                Productivity Stats
              </h2>
              <p className="text-green-600 dark:text-green-400">
                You've completed {completedTasks.length} out of {tasks.length} total tasks
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {Math.round((completedTasks.length / Math.max(tasks.length, 1)) * 100)}%
              </div>
              <p className="text-sm text-green-500 dark:text-green-400">Completion Rate</p>
            </div>
          </div>
        </div>
      )}

      {/* Completed Tasks Grid */}
      {completedTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No completed tasks yet</h3>
            <p>
              Complete some tasks to see them here. Keep up the great work!
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/tasks'}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all font-medium"
          >
            Go to Tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default Completed;