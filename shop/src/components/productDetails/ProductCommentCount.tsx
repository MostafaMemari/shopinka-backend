'use client';

import { useComment } from '@/hooks/reactQuery/useComment';
import React from 'react';

interface ProductCommentCountProps {
  productId: number;
}

function ProductCommentCount({ productId }: ProductCommentCountProps) {
  const { data, isLoading } = useComment({ params: { productId } });

  const CommentCount = data?.pager.totalCount || 0;

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse rounded-lg bg-gray-200 h-6 w-24" />
      ) : (
        <div>
          <a href="#">{CommentCount} دیدگاه</a>
        </div>
      )}
    </>
  );
}

export default ProductCommentCount;
