import { useState, useEffect, useCallback } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ServiceFunction<T> = (...args: any[]) => Promise<T>;

export const useFetchData = <T,>(
  serviceFunction: ServiceFunction<T>,
  defaultArgs: any[] = [],
  fetchOnInit: boolean = true // تعیین اجرای اولیه
): FetchState<T> & { refetch: (newArgs?: any[], resetPage?: boolean) => Promise<void> } => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: fetchOnInit,
    error: null,
  });

  const [queryArgs, setQueryArgs] = useState<any[]>(defaultArgs);
  const [shouldFetch, setShouldFetch] = useState<boolean>(fetchOnInit); // مدیریت اجرای اولیه

  // تابع fetchData برای فراخوانی API
  const fetchData = useCallback(
    async (args: any[] = queryArgs) => {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      try {
        const data = await serviceFunction(...args);
        setState({ data, loading: false, error: null });
      } catch (error: unknown) {
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : "An error occurred",
        });
      }
    },
    [serviceFunction, queryArgs]
  );

  // اجرای درخواست اولیه بر اساس fetchOnInit
  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false); // جلوگیری از درخواست مجدد
    }
  }, [fetchData, shouldFetch]);

  // تابع refetch برای درخواست دستی
  const refetch = useCallback(
    async (newArgs: any[] = [], resetPage: boolean = false) => {
      const updatedArgs = queryArgs.map((arg, index) => {
        if (resetPage && index === 0) return 1; // ریست به صفحه اول
        return newArgs[index] !== undefined ? newArgs[index] : arg;
      });

      if (newArgs.length > queryArgs.length) {
        updatedArgs.push(...newArgs.slice(queryArgs.length));
      }

      setQueryArgs(updatedArgs);
      await fetchData(updatedArgs); // درخواست دستی
    },
    [fetchData, queryArgs]
  );

  return { ...state, refetch };
};
