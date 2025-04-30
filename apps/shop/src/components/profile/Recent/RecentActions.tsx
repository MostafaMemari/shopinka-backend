"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEyeSlash } from "react-icons/fa";
import DashboardHeader from "../DashboardHeader";
import PreviewCard from "../PreviewCard";
import Pagination from "../Pagination";

interface Recent {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

interface RecentActionsProps {
  recent: Recent[];
}

const RecentActions: React.FC<RecentActionsProps> = ({ recent: initialRecent }) => {
  const [recent, setRecent] = useState(initialRecent);

  const handleDeleteAll = () => {
    setRecent([]);
    // می‌تونی اینجا API کال بزنی برای حذف همه
  };

  const handleDelete = (id: string) => {
    setRecent(recent.filter((item) => item.id !== id));
    // می‌تونی اینجا API کال بزنی برای حذف یه آیتم
  };

  return (
    <>
      <div className="col-span-12 lg:col-span-9">
        <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
          <DashboardHeader title="بازدید های اخیر شما" />
          <button className="btn-red w-full px-4 py-2 xs:w-fit" onClick={handleDeleteAll}>
            حذف همه
          </button>
        </div>
        {recent.length === 0 ? (
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
              <FaEyeSlash className="h-20 w-20" />
              <p className="md:text-xl">لیست بازدید های اخیر شما خالی میباشد</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-1 gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recent.map((item) => (
                <PreviewCard key={item.id} favorite={item} onDelete={handleDelete} />
              ))}
            </div>
            <Pagination
              currentPage={1}
              onPageChange={() => {
                console.log("change pagination");
              }}
              itemsPerPage={5}
              totalItems={10}
            />
          </>
        )}
      </div>
    </>
  );
};

export default RecentActions;
