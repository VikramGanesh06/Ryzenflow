import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number; variant?: 'card' | 'text' | 'avatar' }> = ({
  count = 1,
  variant = 'card',
}) => {
  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"
          />
        ))}
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    );
  }

  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse space-y-3"
        >
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      ))}
    </div>
  );
};
