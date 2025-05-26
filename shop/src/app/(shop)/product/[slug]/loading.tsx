export default function Loading() {
  return (
    <div className="container">
      <div className="hidden lg:block">
        <div className="mb-6 rounded-lg bg-muted p-6 shadow-base">
          <div className="mb-10 grid grow grid-cols-12 gap-4">
            {/* Image Gallery Skeleton */}
            <div className="col-span-4">
              <div className="mb-4 aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square animate-pulse rounded-lg bg-gray-200" />
                ))}
              </div>
            </div>

            {/* Product Details Skeleton */}
            <div className="col-span-8">
              <div className="mb-4 h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
              <div className="mb-4 h-6 w-1/4 animate-pulse rounded-lg bg-gray-200" />
              <div className="mb-6 h-12 w-1/3 animate-pulse rounded-lg bg-gray-200" />

              {/* Variants Skeleton */}
              <div className="mb-6">
                <div className="mb-2 h-6 w-24 animate-pulse rounded-lg bg-gray-200" />
                <div className="flex gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />
                  ))}
                </div>
              </div>

              {/* Add to Cart Button Skeleton */}
              <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Loading Skeleton */}
      <div className="lg:hidden">
        <div className="mb-6 relative rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-4">
            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />
          </div>
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
          <div className="mb-4 h-6 w-1/4 animate-pulse rounded-lg bg-gray-200" />
          <div className="mb-6 h-12 w-1/3 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
