import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6
        transition-all duration-300
        ${hoverable ? 'hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 hover:scale-105' : 'shadow-sm'}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
