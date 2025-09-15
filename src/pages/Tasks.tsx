import React, { useState } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/Tasks/TaskCard';
import TaskForm from '../components/Tasks/TaskForm';
import TaskFilters from '../components/Tasks/TaskFilters';
import { Task } from '../types';
import toast from 'react-hot-toast';

const Tasks: React.FC = () => {
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    filter,
    setFilter,
    stats,
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleAddTask = async (data: any) => {
    await addTask(data);
    toast.success('Task created successfully!');
  };

  const handleEditTask = async (data: any) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
      toast.success('Task updated successfully!');
      setEditingTask(undefined);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.success('Task deleted successfully!');
    }
  };

  const handleToggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    toggleTaskComplete(id);
    
    if (task) {
      toast.success(task.completed ? 'Task marked as pending' : 'Task completed!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
            Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your tasks and stay productive
          </p>
        </div>
      </div>

      {/* Create Task Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-heading text-gray-900 dark:text-white">
            Create Task
          </h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Task</span>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Add a new task to organize your work and boost productivity
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold font-heading text-gray-900 dark:text-white mb-4">
          All Tasks
        </h3>
        <TaskFilters
          activeFilter={filter}
          onFilterChange={setFilter}
          stats={stats}
        />
      </div>

      {/* Tasks Grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={(task) => {
                setEditingTask(task);
                setIsFormOpen(true);
              }}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <CheckSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
            <p>
              {filter === 'all' 
                ? "You don't have any tasks yet. Create your first task to get started!"
                : `No tasks match the current filter: ${filter}`
              }
            </p>
          </div>
          {filter === 'all' && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all font-medium"
            >
              Create Your First Task
            </button>
          )}
        </div>
      )}

      {/* Task Form Modal */}
      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        task={editingTask}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      />
    </div>
  );
};

export default Tasks;