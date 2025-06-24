'use client';

import { useEffect } from 'react';
import { useQueryState } from 'nuqs';

export const useResetPageOnQueryChange = (queryKey: string) => {
  const [_, setPage] = useQueryState('page', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  useEffect(() => {
    if (queryKey) {
      setPage(null);
    }
  }, [queryKey, setPage]);
};
