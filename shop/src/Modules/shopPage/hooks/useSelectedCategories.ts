import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSelectedCategories(searchParams: URLSearchParams, router: ReturnType<typeof useRouter>) {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const setFromSearchParams = () => {
    const ids =
      searchParams
        .get('categoryIds')
        ?.split(',')
        .map(Number)
        .filter((id) => !isNaN(id)) || [];
    setSelectedCategories(ids);
  };

  const updateUrl = (params: URLSearchParams) => {
    const newParams = new URLSearchParams(params);
    if (selectedCategories.length > 0) {
      newParams.set('categoryIds', selectedCategories.join(','));
    } else {
      newParams.delete('categoryIds');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const handleCategoryClick = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id: number) => id !== categoryId)
      : [...selectedCategories, categoryId];
    setSelectedCategories(newSelectedCategories);
    router.replace(`/shop?categoryIds=${newSelectedCategories.join(',')}`);
  };

  return { selectedCategories, setFromSearchParams, updateUrl, handleCategoryClick };
}
