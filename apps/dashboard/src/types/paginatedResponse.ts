export interface PaginatedResponse<T> {
  pager: {
    totalCount: 0;
    totalPages: 0;
    currentPage: 1;
    hasNextPage: false;
    hasPreviousPage: false;
  };
  items: T[];
}
