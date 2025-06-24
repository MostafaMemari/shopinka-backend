'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductListShop from './ProductListShop';
import { Product, ProductParams } from '@/types/productType';
import { getProducts } from '@/service/productService';
import LoadingDots from '@/components/shopPage/LoadingDots';
import { Pager } from '@/types/pagerType';

interface Props {
  query: ProductParams;
  initialProducts: Product[];
  pager?: Pager;
}

function Pagination({ currentPage, totalPages }: Pager) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex justify-center space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === page ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default function ProductListShopClient({ query, initialProducts, pager }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(pager?.totalPages || 1);

  const MAX_PAGES = 10;

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setTotalPages(pager?.totalPages || 1);
    setHasMore((pager?.hasNextPage ?? false) && initialProducts.length === (query.take ?? 10) && (pager?.currentPage ?? 1) < MAX_PAGES);
  }, [
    query.hasDiscount,
    query.categoryIds?.toString(),
    query.attributeValueIds?.toString(),
    query.minPrice,
    query.maxPrice,
    query.stockStatus,
    query.search,
    query.sortBy,
    initialProducts,
    pager,
    query.take,
  ]);

  const fetchProducts = async (targetPage: number) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { items, pager: newPager } = await getProducts({ ...query, page: targetPage });
      setProducts(items);
      setPage(targetPage);
      setTotalPages(newPager?.totalPages || 1);
      setHasMore((newPager?.hasNextPage ?? false) && items.length === (query.take ?? 10) && targetPage < MAX_PAGES);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMoreData = async () => {
    if (page >= MAX_PAGES) {
      setHasMore(false);
      return;
    }
    await fetchProducts(page + 1);
  };

  return (
    <div>
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={products.length}
        next={fetchMoreData}
        hasMore={hasMore && page < MAX_PAGES}
        loader={products.length > 0 ? <LoadingDots /> : null}
        endMessage={
          products.length > 0 && page < MAX_PAGES ? (
            <div className="flex justify-center items-center py-8 animate-fadeIn">
              <div className="text-center">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">تمامی محصولات نمایش داده شدند</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">محصولات بیشتری در حال حاضر موجود نیست</p>
              </div>
            </div>
          ) : null
        }
      >
        <ProductListShop products={products} isLoading={isLoading && products.length === 0} />
      </InfiniteScroll>
      {page >= MAX_PAGES && totalPages > MAX_PAGES && (
        <Pagination currentPage={page} totalPages={totalPages} totalCount={0} hasNextPage={false} hasPreviousPage={false} />
      )}
    </div>
  );
}
