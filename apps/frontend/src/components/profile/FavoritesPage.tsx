"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaHeartBroken } from "react-icons/fa";
import DashboardHeader from "./DashboardHeader";
import FavoriteCard from "./FavoriteCard";

interface Favorite {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

interface FavoritesPageProps {
  favorites: Favorite[];
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites: initialFavorites }) => {
  const [favorites, setFavorites] = useState(initialFavorites);

  const handleDeleteAll = () => {
    setFavorites([]);
    // می‌تونی اینجا API کال بزنی برای حذف همه
  };

  const handleDelete = (id: string) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
    // می‌تونی اینجا API کال بزنی برای حذف یه آیتم
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <div className="rounded-lg bg-muted p-5 shadow-base">
        <div className="mb-16 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
          <DashboardHeader title="علاقه‌مندی های شما" />
          <button className="btn-red w-full px-4 py-2 xs:w-fit" onClick={handleDeleteAll}>
            حذف همه
          </button>
        </div>
        {favorites.length === 0 ? (
          <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center gap-y-4 text-text/60">
              <FaHeartBroken className="h-20 w-20" />
              <p className="md:text-xl">علاقه‌مندی های اخیر شما خالی میباشد</p>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-2 gap-1 gap-y-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favorites.map((favorite) => (
                <FavoriteCard key={favorite.id} favorite={favorite} onDelete={handleDelete} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-x-4 md:justify-end">
              <a className="pagination-button flex items-center justify-center" href="#">
                <FaChevronRight className="h-6 w-6" />
              </a>
              <div className="flex items-center gap-x-2">
                <a className="pagination-button pagination-button-active" href="#">
                  1
                </a>
                <p className="text-sm text-text/60">...</p>
                <a className="pagination-button" href="#">
                  3
                </a>
                <a className="pagination-button" href="#">
                  4
                </a>
                <p className="text-sm text-text/60">...</p>
                <a className="pagination-button" href="#">
                  10
                </a>
              </div>
              <a
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
                href="#"
              >
                <FaChevronLeft className="h-6 w-6" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
