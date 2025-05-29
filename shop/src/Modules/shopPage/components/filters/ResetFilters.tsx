'use client';

import { useQueryState } from 'nuqs';
import { useRouter } from 'next/navigation';

function ResetFilters() {
  const router = useRouter();
  const [, setSearch] = useQueryState('search');
  const [, setCategoryIds] = useQueryState('categoryIds');
  const [, setSortBy] = useQueryState('sortBy');
  const [, setMinPrice] = useQueryState('minPrice');
  const [, setMaxPrice] = useQueryState('maxPrice');
  const [, setHasDiscount] = useQueryState('hasDiscount');
  const [, setStockStatus] = useQueryState('stockStatus');
  const [, setAttributeValueIds] = useQueryState('attributeValueIds');

  const handleReset = () => {
    router.replace('/shop');
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
