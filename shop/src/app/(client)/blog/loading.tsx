import SkeletonLoader from '@/components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
        <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
          <SkeletonLoader
            height="22rem"
            className="custom-scrollbar flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3"
          />
        </div>
      </div>
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <SkeletonLoader
          height="3rem"
          className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
        <SkeletonLoader
          height="21rem"
          className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </div>
  );
}
