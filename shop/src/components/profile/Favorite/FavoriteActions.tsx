'use client';

import { useState } from 'react';
import { FaHeartBroken } from 'react-icons/fa';
import DashboardHeader from '../DashboardHeader';
import PreviewCard from '../PreviewCard';
import Pagination from '../Pagination';

interface Favorite {
  id: string;
  image: string;
  title: string;
  link: string;
  isAvailable: boolean;
}

interface FavoriteActionsProps {
  favorites: Favorite[];
}

const FavoriteActions: React.FC<FavoriteActionsProps> = ({ favorites: initialFavorites }) => {
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
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
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
              <PreviewCard key={favorite.id} favorite={favorite} onDelete={handleDelete} />
            ))}
          </div>
          <Pagination
            currentPage={1}
            onPageChange={() => {
              console.log('change pagination');
            }}
            itemsPerPage={5}
            totalItems={10}
          />
        </>
      )}
    </div>
  );
};

export default FavoriteActions;
