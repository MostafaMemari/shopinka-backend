'use client';

import { useQueryState } from 'nuqs';
import { FC } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const [_, setQueryPage] = useQueryState('page', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });

  const maxPagesToShow = 3;
  const pages: (number | { type: 'ellipsis'; id: string })[] = [];

  if (totalPages <= maxPagesToShow + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push({ type: 'ellipsis', id: 'start' });
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push({ type: 'ellipsis', id: 'end' });
    }

    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-x-4 md:justify-end">
      <button
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 cursor-pointer ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:dark:bg-emerald-600'
        }`}
        onClick={() => currentPage > 1 && setQueryPage(String(currentPage - 1))}
        disabled={currentPage === 1}
      >
        <FiChevronRight className="h-6 w-6" />
      </button>

      <div className="flex items-center gap-x-2">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={`page-${page}`}
              onClick={() => setQueryPage(String(page))}
              className={`pagination-button cursor-pointer ${page === currentPage ? 'pagination-button-active' : ''}`}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${page.id}`} className="text-sm text-text/60">
              ...
            </span>
          ),
        )}
      </div>

      <button
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 cursor-pointer ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:dark:bg-emerald-600'
        }`}
        onClick={() => currentPage < totalPages && setQueryPage(String(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Pagination;
