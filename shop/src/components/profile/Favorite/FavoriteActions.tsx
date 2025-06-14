'use client';

import { FaHeartBroken } from 'react-icons/fa';
import DashboardHeader from '../DashboardHeader';
import PreviewCard from '../PreviewCard';
import Pagination from '../Pagination';
import { useFavorite } from '@/hooks/reactQuery/favorite/useFavorite';
import { useToggleFavorite } from '@/hooks/reactQuery/favorite/useToggleFavorite';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useState } from 'react';

const FavoriteActions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const { data, isLoading } = useFavorite({
    params: { page: currentPage },
  });

  const favorites = data?.items || [];
  const favoritePager = data?.pager ?? { totalCount: 0, totalPages: 1 };

  const handleFavoriteToggle = (productId: number) => {
    favoriteToggle(productId);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="علاقه‌مندی های شما" />
      </div>

      {isLoading || isToggleFavoriteLoading ? (
        <LoadingSpinner loadingMessage="در حال بارگذاری علاقه‌مندی ها..." />
      ) : favorites.length === 0 ? (
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
              <PreviewCard
                key={favorite.id}
                name={favorite.product.name}
                imageUrl={favorite.product.mainImage.fileUrl}
                quantity={favorite.product.quantity}
                slug={favorite.product.slug}
                onClick={() => handleFavoriteToggle(favorite.productId)}
              />
            ))}
          </div>
          {favoritePager?.totalCount > 0 && favoritePager?.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={favoritePager?.totalPages} onPageChange={handlePageChange} />
          )}
        </>
      )}
    </div>
  );
};

export default FavoriteActions;
