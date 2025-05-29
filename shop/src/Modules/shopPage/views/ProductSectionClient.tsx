'use client';

import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { ProductParams } from '@/Modules/product/types/productType';
import { parseArrayParam } from '../utils/parseArrayParam';
import dynamic from 'next/dynamic';
import ProductsListLoading from '../components/ProductsListLoading';

// Dynamic import of server component
const ProductListShop = dynamic(() => import('./ProductListShop'), {
  ssr: false,
  loading: () => <ProductsListLoading />,
});

const ProductSectionClient = () => {
  const [search] = useQueryState('search');
  const [categoryIds] = useQueryState('categoryIds');
  const [minPrice] = useQueryState('minPrice');
  const [maxPrice] = useQueryState('maxPrice');
  const [sortBy] = useQueryState('sortBy');

  const params: ProductParams = useMemo(
    () => ({
      page: 1,
      take: 20,
      search: search || undefined,
      categoryIds: parseArrayParam(categoryIds || undefined),
      minPrice: minPrice ? +minPrice : undefined,
      maxPrice: maxPrice ? +maxPrice : undefined,
      sortBy: ['price_asc', 'price_desc', 'newest'].includes(sortBy || '') ? (sortBy as ProductParams['sortBy']) : undefined,
      includeMainImage: true,
    }),
    [search, categoryIds, minPrice, maxPrice, sortBy],
  );

  return <ProductListShop initialParams={params} />;
};

export default ProductSectionClient;
