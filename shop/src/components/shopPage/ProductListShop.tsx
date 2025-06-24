'use client';

import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getProducts } from '@/service/productService';
import { Product, ProductParams } from '@/types/productType';
import ProductCard from '@/components/product/ProductCard';
import LoadingDots from '@/components/shopPage/LoadingDots';
import { Pager } from '@/types/pagerType';
import Pagination from './shop/Pagination';

interface Props {
  initialProducts: Product[];
  initialQuery: ProductParams;
  pager: Pager;
}

const ProductListShop = ({ initialQuery, pager }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(pager.currentPage);
  const [hasMore, setHasMore] = useState(pager.hasNextPage && pager.currentPage < 10);
  const [showPagination, setShowPagination] = useState(pager.currentPage >= 10);

  const fetchMore = async () => {
    const nextPage = page + 1;
    const { items: newProducts, pager: newPager } = await getProducts({
      ...initialQuery,
      page: nextPage,
      take: initialQuery.take ?? 20,
    });

    setProducts((prev) => [...prev, ...newProducts]);
    setPage(nextPage);

    if (!newPager.hasNextPage || nextPage >= 10) {
      setHasMore(false);
      setShowPagination(true);
    }
  };

  return (
    <>
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={products.length}
        next={fetchMore}
        hasMore={hasMore}
        loader={<LoadingDots />}
      >
        <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {showPagination && <Pagination currentPage={page} totalPages={pager.totalPages} />}
    </>
  );
};

export default ProductListShop;
