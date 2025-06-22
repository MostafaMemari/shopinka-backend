'use client';

import { useMemo } from 'react';
import { useQueryState } from 'nuqs';
import { useCategories } from '@/hooks/reactQuery/category/useCategories';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import CategoryAccordion from './CategoryAccordion';
import CategoryItem from './CategoryItem';
import { Category } from '@/types/categoryType';

interface Props {
  type?: 'BLOG' | 'SHOP';
  queryKey?: string;
  title?: string;
}

const CategorySelector: React.FC<Props> = ({ type = 'BLOG', queryKey = 'categoryIds', title = 'دسته‌بندی‌ها' }) => {
  const [categoryIds, setCategoryIds] = useQueryState(queryKey, {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const selectedCategories = useMemo(() => {
    return categoryIds ? categoryIds.split(',').map(Number) : [];
  }, [categoryIds]);

  const { data, isLoading, error } = useCategories({
    enabled: true,
    params: { includeChildren: true, type: type === 'BLOG' ? 'BLOG' : 'PRODUCT' },
    staleTime: 60_000,
    keepPreviousData: true,
  });

  const handleToggle = (id: number) => {
    const updated = selectedCategories.includes(id) ? selectedCategories.filter((cid) => cid !== id) : [...selectedCategories, id];
    setCategoryIds(updated.length ? updated.join(',') : '');
  };

  const collectCategoryIds = (category: Category): number[] => {
    const ids = [category.id];
    category.children?.forEach((c) => {
      ids.push(...collectCategoryIds(c));
    });
    return ids;
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="text-red-600 text-sm">خطا در دریافت دسته‌بندی‌ها</p>;
  if (!data?.items?.length) return <p className="text-gray-600 text-sm">دسته‌بندی‌ای یافت نشد</p>;

  return (
    <div className="bg-white shadow rounded-lg p-3">
      <p className="font-semibold mb-2 text-sm">{title}</p>
      <ul className="space-y-1">
        {data.items.map((cat: Category) => (
          <CategoryAccordion
            key={cat.id}
            title={cat.name}
            checkActive={() => collectCategoryIds(cat).some((id) => selectedCategories.includes(id))}
          >
            <ul className="space-y-1">
              <CategoryItem category={cat} isSelected={selectedCategories.includes(cat.id)} onToggle={() => handleToggle(cat.id)} />
              {cat.children?.map((child) => (
                <CategoryItem
                  key={child.id}
                  category={child}
                  isSelected={selectedCategories.includes(child.id)}
                  onToggle={() => handleToggle(child.id)}
                />
              ))}
            </ul>
          </CategoryAccordion>
        ))}
      </ul>
    </div>
  );
};

export default CategorySelector;
