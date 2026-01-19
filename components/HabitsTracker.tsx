import React, { useState } from 'react';
import { Trash2, Flame, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';
import { Habit } from '../types/tracker';
import { useToast } from '../context/ToastContext';

interface HabitsTrackerProps {
  habits?: Habit[];
  onAddHabit?: (habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'lastCompleted'>) => void;
  onToggleHabit?: (id: string, date: string) => void;
  onDeleteHabit?: (id: string) => void;
}

export const HabitsTracker: React.FC<HabitsTrackerProps> = ({
  habits = [],
  onAddHabit,
  onToggleHabit,
  onDeleteHabit,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', frequency: 'daily' as const, category: 'Health' });
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      addToast('Habit title is required', 'error');
      return;
    }
    onAddHabit?.({
      ...formData,
      streak: 0,
    } as any);
    setFormData({ title: '', description: '', frequency: 'daily', category: 'Health' });
    setShowForm(false);
    addToast('Habit created successfully!', 'success');
  };

  const handleToggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    onToggleHabit?.(id, today);
    addToast('Habit marked complete!', 'success');
  };

  const isCompletedToday = (habit: Habit) => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completions[today];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daily Habits</h2>
        <Button onClick={() => setShowForm(!showForm)} variant="primary" size="sm">
          {showForm ? 'Cancel' : '+ Add Habit'}
        </Button>
      </div>

      {showForm && (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Habit Name
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Morning Meditation"
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
                placeholder="Describe the habit..."
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frequency
                </label>
                <select
                  value={formData.frequency}
                  onChange={e => setFormData({ ...formData, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option>daily</option>
                  <option>weekly</option>
                  <option>monthly</option>
                </select>
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
                  <option>Health</option>
                  <option>Learning</option>
                  <option>Productivity</option>
                  <option>Personal</option>
                </select>
              </div>
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Create Habit
            </Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {habits.map(habit => {
          const completed = isCompletedToday(habit);
          return (
            <Card key={habit.id} hoverable>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{habit.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{habit.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleHabit(habit.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      completed
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900'
                    }`}
                    title="Complete habit"
                  >
                    <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteHabit?.(habit.id)}
                    className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                    title="Delete habit"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{habit.streak} day streak</span>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {habit.frequency}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {habits.length === 0 && !showForm && (
        <Card className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No habits yet. Create one to build better routines!</p>
        </Card>
      )}
    </div>
  );
};
