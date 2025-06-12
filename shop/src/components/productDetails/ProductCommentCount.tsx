import React from 'react';

interface ProductCommentCountProps {
  commentsCount: number;
}

function ProductCommentCount({ commentsCount }: ProductCommentCountProps) {
  return (
    <div>
      <a href="#">{commentsCount} دیدگاه</a>
    </div>
  );
}

export default ProductCommentCount;
