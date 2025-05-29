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
  const isInitialRender = useRef(true);

  const [value, setValue] = useState<T>(() => {
    const paramValue = searchParams.get(paramKey);
    return paramValue !== null ? fromQueryString(paramValue) : defaultValue;
  });

  useEffect(() => {
    // در رندر اولیه، فقط اگر کوئری پارامتر وجود داشته باشد، مقدار را تنظیم کن
    if (isInitialRender.current) {
      const paramValue = searchParams.get(paramKey);
      if (paramValue !== null) {
        const newValue = fromQueryString(paramValue);
        setValue(newValue);
        prevQueryValueRef.current = toQueryString(newValue);
      }
      isInitialRender.current = false;
      return;
    }

    // برای تغییرات بعدی، URL را به‌روزرسانی کن
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
  }, [value, paramKey, toQueryString, fromQueryString, searchParams, router]);

  return [value, setValue] as const;
}
