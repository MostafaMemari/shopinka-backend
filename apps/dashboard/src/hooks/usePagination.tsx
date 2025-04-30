import { useState } from "react";

const usePagination = (initialPage = 1, initialLimit = 10, initialSearch = "") => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);

  const updatePage = (newPage: number) => setPage(newPage);

  const updateLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  };

  const updateSearch = (searchValue: string) => {
    setSearch(searchValue);
    setPage(1);
  };

  return {
    page,
    limit,
    search,
    updatePage,
    updateLimit,
    updateSearch,
  };
};

export default usePagination;
