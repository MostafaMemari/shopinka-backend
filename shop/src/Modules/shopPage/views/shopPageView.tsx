import { Category } from '@/Modules/category/types/categoryType';
import { Product } from '@/Modules/product/types/productType';

import ProductGrid from '@/Modules/shopPage/shop/ProductGrid';

import React from 'react';
import FilterSection from './FilterSection';
import SortBar from '../shop/SortBar';

interface ShopPageViewProps {
  products: Product[];
}

function ShopPageView({ products }: ShopPageViewProps) {
  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <FilterSection />
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        {/* <MobileOptions /> */}
        <SortBar />
        <ProductGrid products={products} />
        {/* <Pagination currentPage={10} totalPages={5} /> */}
      </div>
      {/* <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        config={filterConfig}
      />
      <MobileSortDrawer isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} onSortChange={handleSortChange} /> */}
    </div>
  );
}

export default ShopPageView;
