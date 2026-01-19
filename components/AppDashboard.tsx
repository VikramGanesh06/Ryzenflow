import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { GoalsTracker } from './GoalsTracker';
import { HabitsTracker } from './HabitsTracker';
import { Card } from './Card';
import { ProgressBar } from './ProgressBar';
import { SkeletonLoader } from './SkeletonLoader';
import { Goal, Habit, defaultGoals, defaultHabits } from '../types/tracker';
import { useToast } from '../context/ToastContext';
import { TrendingUp, Target, Flame } from 'lucide-react';

interface AppDashboardProps {
  user?: { email?: string; displayName?: string };
  onLogout: () => void;
}

export const AppDashboard: React.FC<AppDashboardProps> = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState<'overview' | 'goals' | 'habits'>('overview');
  const [goals, setGoals] = useState<Goal[]>(defaultGoals);
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 800);

    // Load from localStorage
    const savedGoals = localStorage.getItem('ryzenflow_goals');
    const savedHabits = localStorage.getItem('ryzenflow_habits');
    
    if (savedGoals) {
      try {
        setGoals(JSON.parse(savedGoals));
      } catch (e) {
        console.error('Failed to parse goals', e);
      }
    }

    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        console.error('Failed to parse habits', e);
      }
    }
  }, []);

  // Save to localStorage whenever goals/habits change
  useEffect(() => {
    localStorage.setItem('ryzenflow_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('ryzenflow_habits', JSON.stringify(habits));
  }, [habits]);

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(g => (g.id === updatedGoal.id ? updatedGoal : g)));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    addToast('Goal deleted', 'info');
  };

  const handleAddHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'completions' | 'lastCompleted'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date(),
      completions: {},
      lastCompleted: null,
    };
    setHabits([...habits, newHabit]);
  };

  const handleToggleHabit = (id: string, date: string) => {
    setHabits(
      habits.map(h => {
        if (h.id === id) {
          const updated = { ...h };
          const wasCompleted = updated.completions[date];
          
          if (wasCompleted) {
            delete updated.completions[date];
            updated.streak = Math.max(0, updated.streak - 1);
          } else {
            updated.completions[date] = true;
            // Check if completing today to increase streak
            const today = new Date().toISOString().split('T')[0];
            if (date === today) {
              updated.streak += 1;
            }
            updated.lastCompleted = new Date(date);
          }
          
          return updated;
        }
        return h;
      })
    );
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(h => h.id !== id));
    addToast('Habit deleted', 'info');
  };

  const userName = user?.displayName || user?.email?.split('@')[0] || 'User';
  
  // Calculate stats
  const completedGoals = goals.filter(g => g.status === 'completed').length;
  const activeGoals = goals.filter(g => g.status === 'active').length;
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const completedHabitsToday = habits.filter(h => {
    const today = new Date().toISOString().split('T')[0];
    return h.completions[today];
  }).length;

  return (
    <DashboardLayout
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      onLogout={onLogout}
      userName={userName}
    >
      {currentTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {userName.split(' ')[0]}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Here's your progress overview and recent activity
            </p>
          </div>

          {loading ? (
            <SkeletonLoader count={3} />
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card hoverable className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Goals</p>
                      <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{activeGoals}</p>
                    </div>
                    <Target className="w-12 h-12 text-purple-200 dark:text-purple-900" />
                  </div>
                </Card>

                <Card hoverable className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Goals</p>
                      <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completedGoals}</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-200 dark:text-green-900" />
                  </div>
                </Card>

                <Card hoverable className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Streak</p>
                      <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalStreak}</p>
                    </div>
                    <Flame className="w-12 h-12 text-orange-200 dark:text-orange-900" />
                  </div>
                </Card>

                <Card hoverable className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Habits</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {completedHabitsToday}/{habits.length}
                      </p>
                    </div>
                    <Flame className="w-12 h-12 text-blue-200 dark:text-blue-900" />
                  </div>
                </Card>
              </div>

              {/* Top Goals */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Goals</h2>
                <div className="space-y-3">
                  {goals.slice(0, 3).map(goal => (
                    <Card key={goal.id}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {goal.progress}/{goal.targetValue}
                        </span>
                      </div>
                      <ProgressBar
                        value={goal.progress}
                        max={goal.targetValue}
                        variant={goal.status === 'completed' ? 'success' : 'primary'}
                      />
                    </Card>
                  ))}
                </div>
              </div>

              {/* Habits Completion */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Daily Habits Status</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {habits.map(habit => {
                    const today = new Date().toISOString().split('T')[0];
                    const completed = habit.completions[today];
                    return (
                      <Card key={habit.id} className={completed ? 'border-green-400 dark:border-green-600' : ''}>
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{habit.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Streak: {habit.streak} days</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full ${
                              completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentTab === 'goals' && (
        <GoalsTracker
          goals={goals}
          onAddGoal={handleAddGoal}
          onUpdateGoal={handleUpdateGoal}
          onDeleteGoal={handleDeleteGoal}
        />
      )}

      {currentTab === 'habits' && (
        <HabitsTracker
          habits={habits}
          onAddHabit={handleAddHabit}
          onToggleHabit={handleToggleHabit}
          onDeleteHabit={handleDeleteHabit}
        />
      )}
    </DashboardLayout>
  );
};
