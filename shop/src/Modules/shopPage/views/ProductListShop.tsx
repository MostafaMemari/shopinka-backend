'use client';

import { useEffect, useState, useMemo } from 'react';
import { useQueryState } from 'nuqs';
import ProductCard from '@/Modules/product/components/ProductCard';
import ProductsListLoading from '../components/ProductsListLoading';
import { getProducts } from '@/Modules/product/services/productService';
import { ProductParams, Product } from '@/Modules/product/types/productType';
import { buildProductParams } from '../utils/buildProductParams';

export default function ProductListShop({ initialParams }: { initialParams: ProductParams }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [page] = useQueryState('page', {
    defaultValue: initialParams.page?.toString() || '1',
    history: 'replace',
  });

  const [search] = useQueryState('search', {
    defaultValue: initialParams.search || '',
    history: 'replace',
  });

  const [minPrice] = useQueryState('minPrice', {
    defaultValue: initialParams.minPrice?.toString() || '',
    history: 'replace',
  });

  const [maxPrice] = useQueryState('maxPrice', {
    defaultValue: initialParams.maxPrice?.toString() || '',
    history: 'replace',
  });

  const [categoryIds] = useQueryState('categoryIds', {
    defaultValue: initialParams.categoryIds?.join(',') || '',
    history: 'replace',
  });

  const [stockStatus] = useQueryState('stockStatus', {
    defaultValue: initialParams.stockStatus || 'all',
    history: 'replace',
  });

  const [hasDiscount] = useQueryState('hasDiscount', {
    defaultValue: initialParams.hasDiscount ? 'true' : '',
    history: 'replace',
  });

  const [sortBy] = useQueryState('sortBy', {
    defaultValue: initialParams.sortBy || '',
    history: 'replace',
  });

  const queryParams = useMemo(
    () => buildProductParams({ page, search, minPrice, maxPrice, categoryIds, stockStatus, hasDiscount, sortBy }, initialParams),
    [page, search, minPrice, maxPrice, categoryIds, stockStatus, hasDiscount, sortBy, initialParams],
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts(queryParams);
        setProducts(response?.items || []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [queryParams]);

  if (isLoading) {
    return <ProductsListLoading />;
  }

  if (!products.length) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
