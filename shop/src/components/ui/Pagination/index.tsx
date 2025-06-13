'use client';

import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-x-4 md:justify-end">
      <div className="flex items-center gap-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AiOutlineRight className="h-5 w-5" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-10 w-10 items-center cursor-pointer justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              currentPage === page ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-primary hover:text-white'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center cursor-pointer rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <AiOutlineLeft className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
