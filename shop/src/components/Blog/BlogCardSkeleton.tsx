export default function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-2 shadow">
      <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        <div className="flex items-center justify-between">
          <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
