'use client';

import { FC } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 3;
  const pages: (number | string)[] = [];

  // محاسبه صفحات برای نمایش
  if (totalPages <= maxPagesToShow + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push('...');
    }
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-x-4 md:justify-end">
      {/* دکمه صفحه قبلی */}
      <a
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 ${
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:dark:bg-emerald-600'
        }`}
        href="#"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <FiChevronRight className="h-6 w-6" />
      </a>
      {/* صفحات */}
      <div className="flex items-center gap-x-2">
        {pages.map((page, index) =>
          typeof page === 'string' ? (
            <p key={index} className="text-sm text-text/60">
              {page}
            </p>
          ) : (
            <a
              key={page}
              className={`pagination-button ${page === currentPage ? 'pagination-button-active' : ''}`}
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          ),
        )}
      </div>
      {/* دکمه صفحه بعدی */}
      <a
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 ${
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary hover:text-white hover:dark:bg-emerald-600'
        }`}
        href="#"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <FiChevronLeft className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Pagination;
