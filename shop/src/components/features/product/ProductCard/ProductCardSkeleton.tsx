'use client';

import { FC } from 'react';

const ProductCardSkeleton: FC = () => {
  return (
    <article className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base animate-pulse">
      <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
        <div className="mb-2 md:mb-5 h-48 bg-gray-200 rounded-lg" />

        <div className="mb-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
