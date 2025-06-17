'use client';

import PreviewCard from '../PreviewCard';
import Pagination from '../Pagination';
import { useFavorite } from '@/hooks/reactQuery/favorite/useFavorite';
import { useToggleFavorite } from '@/hooks/reactQuery/favorite/useToggleFavorite';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useState } from 'react';
import EmptyState from '../EmptyState';
import { FaHeartBroken } from 'react-icons/fa';
import ErrorState from '../ErrorState';

const FavoriteActions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const { data, isLoading, error } = useFavorite({
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
    <>
      <div className="mb-8 space-y-4">
        {isLoading || isToggleFavoriteLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : favorites.length === 0 ? (
          <EmptyState icon={<FaHeartBroken className="w-full h-full" />} />
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
    </>
  );
};

export default FavoriteActions;
