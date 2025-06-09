'use client';

import { FC } from 'react';

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
  shape?: 'rectangle' | 'circle';
}

const SkeletonLoader: FC<SkeletonLoaderProps> = ({ width = '100%', height = '1.5rem', className = '', shape = 'rectangle' }) => {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md';
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 ${shapeClass} ${className}`} style={{ width, height }} />;
};

export default SkeletonLoader;
