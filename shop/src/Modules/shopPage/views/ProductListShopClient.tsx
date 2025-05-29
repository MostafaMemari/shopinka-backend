'use client';

import { useEffect, useState } from 'react';
import ProductListShop from './ProductListShop';
import { Product, ProductParams } from '@/Modules/product/types/productType';
import { getProducts } from '@/Modules/product/services/productService';

interface Props {
  query: ProductParams;
}

export default function ProductListShopClient({ query }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getProducts(query).then((res) => {
      setProducts(res.items || []);
      setIsLoading(false);
    });
  }, [JSON.stringify(query)]);

  return <ProductListShop products={products} isLoading={isLoading} />;
}
