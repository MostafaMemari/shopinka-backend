import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  if (totalItems < 10) return null;

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesToShow = 3;
  const pages: (number | string)[] = [];

  if (totalPages <= pagesToShow + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-x-4 md:justify-end">
      <button
        className="pagination-button flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="صفحه قبلی"
      >
        <FaChevronRight className="h-6 w-6" />
      </button>
      <div className="flex items-center gap-x-2">
        {pages.map((page, index) =>
          typeof page === "string" ? (
            <p key={`ellipsis-${index}`} className="text-sm text-text/60">
              ...
            </p>
          ) : (
            <button
              key={page}
              className={`pagination-button ${page === currentPage ? "pagination-button-active" : ""}`}
              onClick={() => onPageChange(page)}
              aria-label={`صفحه ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          )
        )}
      </div>
      <button
        className="pagination-button flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="صفحه بعدی"
      >
        <FaChevronLeft className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Pagination;
