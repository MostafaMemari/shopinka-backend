'use client';

import { useMemo } from 'react';
import { useCategories } from '@/hooks/reactQuery/category/useCategories';
import CategoryItem from './CategoryItem';
import { useQueryState } from 'nuqs';
import Accordion from '@/modules/shopPage/shop/Accordion';
import { Category } from '@/types/categoryType';

function CategorySelector() {
  const [categoryIds, setCategoryIds] = useQueryState('categoryIds', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const selectedCategories = useMemo(() => {
    return categoryIds ? categoryIds.split(',').map(Number) : [];
  }, [categoryIds]);

  const { data, isLoading, error } = useCategories({
    enabled: true,
    params: { includeChildren: true },
    staleTime: 1 * 60 * 1000,
    keepPreviousData: true,
  });

  const handleCategoryClick = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id: number) => id !== categoryId)
      : [...selectedCategories, categoryId];

    if (newSelectedCategories.length === 0) {
      setCategoryIds('');
    } else {
      setCategoryIds(newSelectedCategories.join(','));
    }
  };

  const getCategoryIds = (category: Category): number[] => {
    const ids = [category.id];
    if (category.children) {
      category.children.forEach((child) => {
        ids.push(...getCategoryIds(child));
      });
    }
    return ids;
  };

  return (
    <div className="rounded-lg bg-white p-2 shadow">
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <p className="text-red-600 text-sm">خطا در بارگذاری دسته‌بندی‌ها</p>
      ) : !data?.items || data.items.length === 0 ? (
        <p className="text-gray-600 text-sm">هیچ دسته‌بندی یافت نشد</p>
      ) : (
        <ul className="space-y-1">
          {data.items.map((category: Category) => (
            <Accordion
              key={category.id}
              title="دسته بندی"
              checkActive={() => getCategoryIds(category).some((id) => selectedCategories.includes(id))}
              className="border-b border-gray-200 last:border-b-0"
              contentClassName="pl-4"
            >
              <ul className="space-y-1">
                <CategoryItem
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onToggle={() => handleCategoryClick(category.id)}
                />
                {category.children?.map((child) => (
                  <CategoryItem
                    key={child.id}
                    category={child}
                    isSelected={selectedCategories.includes(child.id)}
                    onToggle={() => handleCategoryClick(child.id)}
                  />
                ))}
              </ul>
            </Accordion>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategorySelector;
