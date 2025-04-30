import React from "react";
import { PaginationProps } from "./types";
import PaginationLink from "./PaginationLink";
import Lucide from "../../base-components/Lucide";

const Pagination: React.FC<PaginationProps> = ({ limit, page, pageCount, onPageChange, onLimitChange }) => {
  const renderPages = () => {
    const pages = [];

    if (pageCount <= 7) {
      // اگر تعداد صفحات کمتر از 7 باشد، همه را نمایش بده
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          <PaginationLink key={i} active={i === page} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        );
      }
    } else if (page < 4) {
      // صفحات ابتدایی: 1 2 3 4 ... pageCount
      for (let i = 1; i <= 4; i++) {
        pages.push(
          <PaginationLink key={i} active={i === page} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        );
      }
      pages.push(
        <PaginationLink key="dots-end" hidden={false} onClick={() => onPageChange(5)}>
          ...
        </PaginationLink>
      );
      pages.push(
        <PaginationLink key={pageCount} active={false} onClick={() => onPageChange(pageCount)}>
          {pageCount}
        </PaginationLink>
      );
    } else if (page + 3 > pageCount) {
      // صفحات انتهایی: 1 ... pageCount-3 pageCount-2 pageCount-1 pageCount
      pages.push(
        <PaginationLink key={1} active={false} onClick={() => onPageChange(1)}>
          1
        </PaginationLink>
      );
      pages.push(
        <PaginationLink key="dots-start" hidden={false} onClick={() => onPageChange(page - 4)}>
          ...
        </PaginationLink>
      );
      for (let i = pageCount - 3; i <= pageCount; i++) {
        pages.push(
          <PaginationLink key={i} active={i === page} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        );
      }
    } else {
      // صفحات میانی: 1 ... page-2 page-1 page page+1 page+2 ... pageCount
      pages.push(
        <PaginationLink key={1} active={false} onClick={() => onPageChange(1)}>
          1
        </PaginationLink>
      );
      pages.push(
        <PaginationLink key="dots-start" hidden={false} onClick={() => onPageChange(page - 3)}>
          ...
        </PaginationLink>
      );
      for (let i = page - 2; i <= page + 2; i++) {
        pages.push(
          <PaginationLink key={i} active={i === page} onClick={() => onPageChange(i)}>
            {i}
          </PaginationLink>
        );
      }
      pages.push(
        <PaginationLink key="dots-end" hidden={false} onClick={() => onPageChange(page + 3)}>
          ...
        </PaginationLink>
      );
      pages.push(
        <PaginationLink key={pageCount} active={false} onClick={() => onPageChange(pageCount)}>
          {pageCount}
        </PaginationLink>
      );
    }

    return pages;
  };

  return (
    pageCount > 0 && (
      <div className="flex flex-wrap items-center justify-between col-span-12 intro-y sm:flex-row sm:flex-nowrap">
        <nav className="w-full sm:w-auto sm:ml-auto">
          <ul className="flex">
            {/* دکمه صفحه قبلی */}
            <PaginationLink onClick={() => onPageChange(page - 1)} hidden={page === 1}>
              <Lucide icon="ChevronRight" className="w-4 h-4" />
            </PaginationLink>

            {/* صفحات */}
            {renderPages()}

            {/* دکمه صفحه بعدی */}
            <PaginationLink onClick={() => onPageChange(page + 1)} hidden={page === pageCount}>
              <Lucide icon="ChevronLeft" className="w-4 h-4" />
            </PaginationLink>
          </ul>
        </nav>

        {/* انتخاب تعداد آیتم‌ها */}
        <select
          className="w-20 mt-3 !box sm:mt-0"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={35}>35</option>
          <option value={50}>50</option>
        </select>
      </div>
    )
  );
};

export default Pagination;
