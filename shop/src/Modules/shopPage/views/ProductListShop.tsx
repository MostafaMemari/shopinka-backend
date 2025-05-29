import ProductCard from '@/Modules/product/components/ProductCard';
import { getProducts } from '@/Modules/product/services/productService';
import { ProductParams, Product } from '@/Modules/product/types/productType';
import { cache } from 'react';
import { Suspense } from 'react';
import ProductsListLoading from '../components/ProductsListLoading';

// Cache the getProducts function for better performance
const getCachedProducts = cache(async (params: ProductParams) => {
  return getProducts(params);
});

async function ProductList({ params }: { params: ProductParams }) {
  const productData = await getCachedProducts(params);
  const products = productData?.items || [];

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-gray-500">محصولی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ProductListShop({ params }: { params: ProductParams }) {
  return (
    <Suspense fallback={<ProductsListLoading />}>
      <ProductList params={params} />
    </Suspense>
  );
}
