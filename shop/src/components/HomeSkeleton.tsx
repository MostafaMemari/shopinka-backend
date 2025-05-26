'use client';

import React from 'react';

export default function HomeSkeleton() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4">
      {/* Banner Slider Skeleton */}
      <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      </div>

      {/* Discounted Products Skeleton */}
      <div className="mt-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px] flex-shrink-0">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
          {/* Navigation Buttons Skeleton */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Newest Products Skeleton */}
      <div className="mt-8">
        <div className="mb-4 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[280px] flex-shrink-0">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-6 w-3/4 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-4 w-1/2 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-10 w-full animate-pulse rounded-lg bg-gray-200" />
              </div>
            ))}
          </div>
          {/* Navigation Buttons Skeleton */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
