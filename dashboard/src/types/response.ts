export type Pager = {
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export type Response<T> = { status: number; data: { items: T[]; pager: Pager } }
