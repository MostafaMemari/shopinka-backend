'use client';

import { useQueryState } from 'nuqs';
import { refetchProducts } from '@/Modules/product/services/productService';

function ResetFilters() {
  const [, setSearch] = useQueryState('search');
  const [, setCategoryIds] = useQueryState('categoryIds');
  const [, setSortBy] = useQueryState('sortBy');
  const [, setMinPrice] = useQueryState('minPrice');
  const [, setMaxPrice] = useQueryState('maxPrice');

  const handleReset = () => {
    setSearch(null);
    setCategoryIds(null);
    setSortBy(null);
    setMinPrice(null);
    setMaxPrice(null);
    refetchProducts();
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="xl:text-lg">فیلتر محصولات</h3>
      <button className="btn-primary-nobg py-2 text-sm cursor-pointer" onClick={handleReset}>
        حذف همه
      </button>
    </div>
  );
}

export default ResetFilters;
