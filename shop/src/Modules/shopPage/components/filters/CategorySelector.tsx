'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Category } from '@/Modules/category/types/categoryType';
import { useCategories } from '@/Modules/category/hooks/useCategories';

function CategorySelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());

  // Fetch categories using useCategories hook
  const { data, isLoading, error } = useCategories({
    enabled: true,
    params: { includeChildren: true },
    staleTime: 1 * 60 * 1000,
  });

  // Initialize selected categories from URL query on mount
  useEffect(() => {
    const categoryIds =
      searchParams
        .get('categoryIds')
        ?.split(',')
        .map(Number)
        .filter((id) => !isNaN(id)) || [];
    setSelectedCategories(new Set(categoryIds));
  }, [searchParams]);

  // Update URL when selectedCategories changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (selectedCategories.size > 0) {
      newParams.set('categoryIds', Array.from(selectedCategories).join(','));
    } else {
      newParams.delete('categoryIds');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [selectedCategories, searchParams, router]);

  // Handle category toggle
  const handleCategoryToggle = useCallback((categoryId: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  // Flatten categories and subcategories into a single list
  const flattenCategories = useCallback((categories: Category[], depth: number = 0): { category: Category; depth: number }[] => {
    let result: { category: Category; depth: number }[] = [];
    categories.forEach((category) => {
      result.push({ category, depth });
      if (category.children && category.children.length > 0) {
        result = result.concat(flattenCategories(category.children, depth + 1));
      }
    });
    return result;
  }, []);

  // Memoize flattened categories
  const flatCategories = useMemo(() => {
    if (!data?.items) return [];
    return flattenCategories(data.items);
  }, [data, flattenCategories]);

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
            <li key={category.id} className={`pr-${depth * 4}`}>
              <div className="flex items-center gap-x-3 rounded-lg px-4 py-2 hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  onClick={() => handleCategoryToggle(category.id)}
                  className="flex-1 text-sm text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {category.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySelector;
