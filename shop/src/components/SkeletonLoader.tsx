// components/SkeletonLoader.tsx
import { FC } from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ count = 4, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-lg bg-gray-200 p-4">
          <div className="mb-4 h-40 w-full rounded-lg bg-gray-300" />
          <div className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
          <div className="h-4 w-1/2 rounded bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
