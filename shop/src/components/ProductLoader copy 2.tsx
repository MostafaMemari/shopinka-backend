// components/ProductLoader.tsx (بدون 'use client')

export default function SkeletonLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm animate-pulse space-y-4">
          <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-lg" />

          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />

          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />

          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-md" />
        </div>
      ))}
    </div>
  );
}
