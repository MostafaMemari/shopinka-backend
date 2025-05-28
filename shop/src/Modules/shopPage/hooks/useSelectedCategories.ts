import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useSelectedCategories(searchParams: URLSearchParams, router: ReturnType<typeof useRouter>) {
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());

  const setFromSearchParams = () => {
    const ids =
      searchParams
        .get('categoryIds')
        ?.split(',')
        .map(Number)
        .filter((id) => !isNaN(id)) || [];
    setSelectedCategories(new Set(ids));
  };

  const updateUrl = (params: URLSearchParams) => {
    const newParams = new URLSearchParams(params);
    if (selectedCategories.size > 0) {
      newParams.set('categoryIds', Array.from(selectedCategories).join(','));
    } else {
      newParams.delete('categoryIds');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return { selectedCategories, setFromSearchParams, updateUrl, toggleCategory };
}
