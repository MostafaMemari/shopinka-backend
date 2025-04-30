import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    search: "",
    filters: {},
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    console.log(params);

    const pageFromQuery = params.get("page");
    const limitFromQuery = params.get("limit");
    const searchFromQuery = params.get("search");
    const filterCategory = params.get("filter_category");

    setQueryParams((prev) => ({
      ...prev,
      page: pageFromQuery ? Number(pageFromQuery) : prev.page,
      limit: limitFromQuery ? Number(limitFromQuery) : prev.limit,
      search: searchFromQuery || prev.search,
      filters: filterCategory ? { category: filterCategory } : prev.filters,
    }));
  }, [location.search]);

  const updateQueryParams = (newParams: any) => {
    const params = new URLSearchParams(location.search);

    // اضافه کردن یا بروزرسانی پارامترها در URL
    Object.keys(newParams).forEach((key) => {
      if (newParams[key]) {
        params.set(key, newParams[key]);
      } else {
        params.delete(key);
      }
    });

    navigate({ search: params.toString() }); // استفاده از navigate به جای history.push
  };

  return {
    queryParams,
    updateQueryParams,
  };
};

export default useQueryParams;
