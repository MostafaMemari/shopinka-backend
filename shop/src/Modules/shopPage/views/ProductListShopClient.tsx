'use client';

import { useEffect, useState } from 'react';
import ProductListShop from './ProductListShop';
import { Product, ProductParams } from '@/Modules/product/types/productType';
import { getProducts } from '@/Modules/product/services/productService';

interface Props {
  query: ProductParams;
  initialProducts: Product[];
}

export default function ProductListShopClient({ query, initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProducts(query).then((res) => {
      setProducts(res.items || []);
      setIsLoading(false);
    });
  }, [JSON.stringify(query)]);

  return <ProductListShop products={products} isLoading={isLoading} />;
}
