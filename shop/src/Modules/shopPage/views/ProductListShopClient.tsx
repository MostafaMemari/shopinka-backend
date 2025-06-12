'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductListShop from './ProductListShop';
import { Product, ProductParams } from '@/types/productType';
import { getProducts } from '@/modules/product/services/productService';
import LoadingDots from '../components/LoadingDots';
import { Pager } from '@/shared/types/pagerType';
import EndMessage from '../components/EndMessage';

interface Props {
  query: ProductParams;
  initialProducts: Product[];
  pager?: Pager;
}

export default function ProductListShopClient({ query, initialProducts, pager }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_PAGES = 10;

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore((pager?.hasNextPage ?? false) && initialProducts.length === (query.take ?? 20) && (pager?.currentPage ?? 1) < MAX_PAGES);
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

  const fetchMoreData = async () => {
    if (isLoading || page >= MAX_PAGES) {
      setHasMore(false);
      return;
    }

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const { items, pager: newPager } = await getProducts({ ...query, page: nextPage });
      setProducts((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore((newPager?.hasNextPage ?? false) && items.length === (query.take ?? 20) && nextPage < MAX_PAGES);
    } catch (error) {
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InfiniteScroll
      style={{ overflow: 'hidden' }}
      dataLength={products.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={products.length > 0 ? <LoadingDots /> : null}
      endMessage={products.length > 0 ? <EndMessage /> : null}
    >
      <ProductListShop products={products} isLoading={isLoading && products.length === 0} />
    </InfiniteScroll>
  );
}
