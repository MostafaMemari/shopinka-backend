import ProductCard from '@/modules/product/components/ProductCard';
import { Product } from '@/modules/product/types/productType';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import MobileFilterSection from './MobileFilterSection';

export default function ProductListShop({ products, isLoading }: { products: Product[]; isLoading?: boolean }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-px gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
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
