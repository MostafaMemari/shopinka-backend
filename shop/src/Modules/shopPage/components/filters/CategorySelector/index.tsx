'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCategories } from '@/Modules/category/hooks/useCategories';
import { useEffect, useMemo } from 'react';
import { flattenCategories } from '../../utils/flattenCategories';
import CategoryItem from './CategoryItem';
import { useSelectedCategories } from '../../hooks/useSelectedCategories';

function CategorySelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { selectedCategories, setFromSearchParams, toggleCategory, updateUrl } = useSelectedCategories(searchParams, router);

  const { data, isLoading, error } = useCategories({
    enabled: true,
    params: { includeChildren: true },
    staleTime: 1 * 60 * 1000,
  });

  // Initialize from URL
  useEffect(() => {
    setFromSearchParams();
  }, [searchParams]);

  // Update URL on change
  useEffect(() => {
    updateUrl(searchParams);
  }, [selectedCategories]);

  const flatCategories = useMemo(() => {
    if (!data?.items) return [];
    return flattenCategories(data.items);
  }, [data]);

  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold">دسته‌بندی‌ها</h3>
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-sm">خطا در بارگذاری دسته‌بندی‌ها</p>
      ) : flatCategories.length === 0 ? (
        <p className="text-gray-600 text-sm">هیچ دسته‌بندی یافت نشد</p>
      ) : (
        <ul className="space-y-1">
          {flatCategories.map(({ category, depth }) => (
            <CategoryItem
              key={category.id}
              category={category}
              isSelected={selectedCategories.has(category.id)}
              onToggle={() => toggleCategory(category.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySelector;
