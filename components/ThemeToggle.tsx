import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          } text-yellow-500`}
        />
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          } text-blue-400`}
        />
      </div>
      <span className="sr-only">Toggle dark mode</span>
    </button>
  );
};
