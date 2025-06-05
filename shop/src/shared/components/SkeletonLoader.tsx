'use client';

import { FC } from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ width = '100%', height = '1.5rem', className = '' }) => {
  return <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`} style={{ width, height }} />;
};

export default SkeletonLoader;
