'use client';

import { useMemo } from 'react';
import { useCategories } from '@/Modules/category/hooks/useCategories';
import { flattenCategories } from '../../../utils/flattenCategories';
import CategoryItem from './CategoryItem';
import { useQueryState } from 'nuqs';

type CategorySet = Set<number>;

function CategorySelector() {
  const [selectedCategories, setSelectedCategories] = useQueryState<CategorySet>('categoryIds', {
    defaultValue: new Set(),
    parse: (value) => new Set(value.split(',').map(Number).filter(Boolean)),
    serialize: (value) => Array.from(value).join(','),
  });

  const { data, isLoading, error } = useCategories({
    enabled: true,
    params: { includeChildren: true },
    staleTime: 1 * 60 * 1000,
  });

  const flatCategories = useMemo(() => {
    if (!data?.items) return [];
    return flattenCategories(data.items);
  }, [data]);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

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
          {flatCategories.map(({ category }) => (
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
