'use client';

import { useMemo, useCallback } from 'react';
import { useQueryState } from 'nuqs';
import CategoryAccordion from './CategoryAccordion';
import CategoryItem from './CategoryItem';
import { Category } from '@/types/categoryType';

interface Props {
  queryKey?: string;
  title?: string;
  categories: Category[];
}

const CategorySelector: React.FC<Props> = ({ queryKey = 'categoryIds', title = 'دسته‌بندی‌ها', categories }) => {
  const [categoryIds, setCategoryIds] = useQueryState(queryKey, {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const selectedCategories = useMemo(() => (categoryIds ? categoryIds.split(',').map(Number) : []), [categoryIds]);

  const collectCategoryIds = useCallback((category: Category): number[] => {
    return [category.id, ...(category.children?.flatMap(collectCategoryIds) ?? [])];
  }, []);

  const allCategoryIds = useMemo(() => categories.flatMap(collectCategoryIds), [categories, collectCategoryIds]);

  const isCategoryActive = useMemo(
    () => allCategoryIds.some((id) => selectedCategories.includes(id)),
    [allCategoryIds, selectedCategories],
  );

  const handleToggle = useCallback(
    (id: number) => {
      const updated = selectedCategories.includes(id) ? selectedCategories.filter((cid) => cid !== id) : [...selectedCategories, id];

      setCategoryIds(updated.length ? updated.join(',') : '');
    },
    [selectedCategories, setCategoryIds],
  );

  if (!categories || categories.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-lg p-3">
      <ul className="space-y-1">
        <CategoryAccordion title={title} checkActive={() => isCategoryActive}>
          <ul className="space-y-1">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                category={category}
                isSelected={selectedCategories.includes(category.id)}
                onToggle={() => handleToggle(category.id)}
              />
            ))}
          </ul>
        </CategoryAccordion>
      </ul>
    </div>
  );
};

export default CategorySelector;
