import React from 'react';
import { CheckSquare, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import ProgressBar from '../components/UI/ProgressBar';

const Dashboard: React.FC = () => {
  const { stats } = useTasks();

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: CheckSquare,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: Clock,
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    },
    {
      title: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-heading text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome to SNM Tasks! Here's an overview of your tasks.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(({ title, value, icon: Icon, color, bgColor }) => (
          <div
            key={title}
            className={`bg-gradient-to-br ${bgColor} border border-gray-200 dark:border-gray-700 rounded-2xl p-6 animate-fade-in`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {title}
                </p>
                <p className="text-3xl font-bold font-heading text-gray-900 dark:text-white">
                  {value}
                </p>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-6">
          Progress Overview
        </h2>
        <div className="space-y-6">
          <ProgressBar
            percentage={stats.completionRate}
            label="Overall Completion Rate"
          />
          
          {stats.total > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Task Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      {stats.completed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pending</span>
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      {stats.pending}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {stats.completionRate}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Welcome Message */}
      {stats.total === 0 && (
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border border-primary-200 dark:border-primary-700 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold font-heading text-gray-900 dark:text-white mb-2">
            Welcome to SNM Task Management!
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You don't have any tasks yet. Create your first task to get started with managing your workflow.
          </p>
          <button
            onClick={() => window.location.href = '/tasks'}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all font-medium"
          >
            Create Your First Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;