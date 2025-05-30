'use client';

import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductListShop from './ProductListShop';
import { Product, ProductParams } from '@/Modules/product/types/productType';
import { getProducts } from '@/Modules/product/services/productService';
import LoadingDots from '../components/LoadingDots';

interface Props {
  query: ProductParams;
  initialProducts: Product[];
}

export default function ProductListShopClient({ query, initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
    setHasMore(true);
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
  ]);

  const fetchMoreData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const { items, pager } = await getProducts({ ...query, page: nextPage });
      setProducts((prev) => [...prev, ...items]);
      setPage(nextPage);
      setHasMore(pager?.hasNextPage ?? false);
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
      loader={<LoadingDots />}
      endMessage={null}
    >
      <ProductListShop products={products} isLoading={isLoading && products.length === 0} />
    </InfiniteScroll>
  );
}
