import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-x-4 md:justify-end">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <AiOutlineRight className="h-5 w-5" />
      </button>
      <div className="flex items-center gap-x-2">
        {pages.map((page) => (
          <button
            key={page}
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm transition-all duration-200 cursor-pointer ${
              currentPage === page ? 'bg-primary text-white' : 'bg-muted hover:bg-primary hover:text-white'
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <AiOutlineLeft className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Pagination;
