'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from '@/components/product/ProductCard';

import { getProducts } from '@/service/productService';
import LoadingDots from '@/components/shopPage/LoadingDots';
import Pagination from '@/components/shopPage/shop/Pagination';
import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '@/types/productType';

interface ProductListShopProps {
  initialProducts: Product[];
  initialQuery: ProductParams;
  pager: Pager;
}

export default function ProductListShop({ initialProducts, initialQuery, pager }: ProductListShopProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(pager.currentPage);
  const [hasMore, setHasMore] = useState(pager.hasNextPage && page < 10);
  const [showPagination, setShowPagination] = useState(page >= 10);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(pager.currentPage);
    setHasMore(pager.hasNextPage && pager.currentPage < 10);
    setShowPagination(pager.currentPage >= 10);
  }, [initialQuery]);

  const fetchMore = async () => {
    const nextPage = page + 1;
    const { items: newProducts, pager: newPager } = await getProducts({
      ...initialQuery,
      page: nextPage,
      take: initialQuery.take ?? 20,
    });

    setProducts((prev) => {
      const all = [...prev, ...newProducts];
      const unique = Array.from(new Map(all.map((p) => [p.id, p])).values());
      return unique;
    });

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
        <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </InfiniteScroll>

      {showPagination && <Pagination currentPage={page} totalPages={pager.totalPages} />}
    </>
  );
}
