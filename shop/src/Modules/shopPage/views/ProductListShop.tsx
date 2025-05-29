import ProductCard from '@/Modules/product/components/ProductCard';
import { getProducts } from '@/Modules/product/services/productService';
import { ProductParams, Product } from '@/Modules/product/types/productType';
import React from 'react';

async function ProductListShop({ params }: { params: ProductParams }) {
  const productData = await getProducts({ ...params });
  const products = productData.items;

  return (
    <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductListShop;
