'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

interface UseQueryParamOptions<T> {
  paramKey: string;
  defaultValue: T;
  toQueryString: (value: T) => string;
  fromQueryString: (value: string | null) => T;
}

export function useQueryParam<T>({ paramKey, defaultValue, toQueryString, fromQueryString }: UseQueryParamOptions<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prevQueryValueRef = useRef<string | null>(null);

  const [value, setValue] = useState<T>(() => {
    const paramValue = searchParams.get(paramKey);
    return paramValue !== null ? fromQueryString(paramValue) : defaultValue;
  });

  useEffect(() => {
    const currentQueryValue = toQueryString(value);
    if (currentQueryValue !== prevQueryValueRef.current) {
      const newParams = new URLSearchParams(searchParams);
      if (currentQueryValue) {
        newParams.set(paramKey, currentQueryValue);
      } else {
        newParams.delete(paramKey);
      }
      router.replace(`?${newParams.toString()}`, { scroll: false });
      prevQueryValueRef.current = currentQueryValue;
    }
  }, [value, paramKey, toQueryString, searchParams, router]);

  return [value, setValue] as const;
}
