import { useSearchParams } from "react-router-dom";

export const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // به‌روزرسانی Query String
  const updateQueryString = (filters: Record<string, string | number | null | undefined>) => {
    const params = new URLSearchParams(searchParams);

    // بروزرسانی یا حذف پارامترها
    Object.entries(filters).forEach(([key, value]) => {
      if (value != null && value !== "") {
        params.set(key, String(value)); // مقدار معتبر را اضافه کن
      } else {
        params.delete(key); // کلید با مقدار خالی را حذف کن
      }
    });

    // اطمینان از عدم وجود پارامترهای تکراری و به‌روزرسانی URL
    setSearchParams(params);
  };

  // خواندن Query String
  const getQueryString = () => {
    const filters: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      filters[key] = value;
    });

    return filters;
  };

  return { updateQueryString, getQueryString };
};
