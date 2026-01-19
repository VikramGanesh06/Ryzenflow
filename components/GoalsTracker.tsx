import React, { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { Goal } from '../types/tracker';
import { useToast } from '../context/ToastContext';

interface GoalsTrackerProps {
  goals?: Goal[];
  onAddGoal?: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  onUpdateGoal?: (goal: Goal) => void;
  onDeleteGoal?: (id: string) => void;
}

export const GoalsTracker: React.FC<GoalsTrackerProps> = ({
  goals = [],
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', targetValue: 100, category: 'Work' });
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addToast('Goal title is required', 'error');
      return;
    }
    onAddGoal?.({
      ...formData,
      progress: 0,
      status: 'active',
      targetValue: formData.targetValue,
    } as any);
    setFormData({ title: '', description: '', targetValue: 100, category: 'Work' });
    setShowForm(false);
    addToast('Goal created successfully!', 'success');
  };

  const handleToggleStatus = (goal: Goal) => {
    onUpdateGoal?.({
      ...goal,
      status: goal.status === 'active' ? 'completed' : 'active',
    });
    addToast(
      `Goal marked as ${goal.status === 'active' ? 'completed' : 'active'}`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Goals</h2>
        <Button onClick={() => setShowForm(!showForm)} variant="primary" size="sm">
          {showForm ? 'Cancel' : '+ Add Goal'}
        </Button>
      </div>

      {showForm && (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Learn React"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your goal..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Value
                </label>
                <input
                  type="number"
                  value={formData.targetValue}
                  onChange={e => setFormData({ ...formData, targetValue: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Health</option>
                  <option>Learning</option>
                </select>
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Create Goal
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {goals.map(goal => (
          <Card key={goal.id} hoverable className={goal.status === 'completed' ? 'opacity-75' : ''}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{goal.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(goal)}
                  className={`p-2 rounded-lg transition-colors ${
                    goal.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900'
                  }`}
                  title="Toggle completion"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() => onDeleteGoal?.(goal.id)}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  title="Delete goal"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {goal.category}
              </span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                goal.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
              }`}>
                {goal.status === 'completed' ? 'Completed' : 'Active'}
              </span>
            </div>
            <ProgressBar
              value={goal.progress}
              max={goal.targetValue}
              label={`Progress: ${goal.progress}/${goal.targetValue}`}
              variant={goal.status === 'completed' ? 'success' : 'primary'}
            />
          </Card>
        ))}
      </div>

      {goals.length === 0 && !showForm && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No goals yet. Create one to get started!</p>
        </Card>
      )}
    </div>
  );
};
