export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  targetValue: number;
  status: 'active' | 'completed';
  category: string;
  createdAt: Date;
  deadline?: Date;
}

export interface Habit {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted: Date | null;
  completions: { [date: string]: boolean };
  createdAt: Date;
  category: string;
}

export const defaultGoals: Goal[] = [
  {
    id: '1',
    title: 'Learn TypeScript',
    description: 'Master TypeScript fundamentals and advanced patterns',
    progress: 65,
    targetValue: 100,
    status: 'active',
    category: 'Learning',
    createdAt: new Date('2024-01-01'),
    deadline: new Date('2024-03-31'),
  },
  {
    id: '2',
    title: 'Complete Project',
    description: 'Finish the SaaS dashboard implementation',
    progress: 80,
    targetValue: 100,
    status: 'active',
    category: 'Work',
    createdAt: new Date('2024-01-05'),
  },
];

export const defaultHabits: Habit[] = [
  {
    id: '1',
    title: 'Morning Exercise',
    description: '30 minutes of workout',
    frequency: 'daily',
    streak: 15,
    lastCompleted: new Date(),
    completions: {},
    createdAt: new Date('2024-01-01'),
    category: 'Health',
  },
  {
    id: '2',
    title: 'Read',
    description: 'Read 20 pages of a book',
    frequency: 'daily',
    streak: 8,
    lastCompleted: new Date(),
    completions: {},
    createdAt: new Date('2024-01-10'),
    category: 'Learning',
  },
];
