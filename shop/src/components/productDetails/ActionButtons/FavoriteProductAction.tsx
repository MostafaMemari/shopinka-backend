'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useToggleFavorite } from '@/hooks/reactQuery/favorite/useToggleFavorite';
import { useProductFavorite } from '@/hooks/reactQuery/product/useProduct';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

interface FavoriteProductActionProps {
  productId: number;
  isTooltip?: boolean;
  className?: string;
}

function FavoriteProductAction({ productId, isTooltip = false, className }: FavoriteProductActionProps) {
  const [isMounted, setIsMounted] = useState(false);

  const { isLogin, isLoading } = useAuth();
  const pathname = usePathname();
  const { data: isFavoriteProduct, refetch, isLoading: isFavoriteLoading } = useProductFavorite({ productId });
  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const handleAddToFavorite = () => {
    if (isToggleFavoriteLoading) return;
    favoriteToggle(productId, refetch);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isLoading || isFavoriteLoading || isToggleFavoriteLoading) return <FaSpinner className="h-6 w-6 animate-spin" />;

  return (
    <>
      {isLogin ? (
        <button
          type="button"
          onClick={handleAddToFavorite}
          disabled={isFavoriteLoading || isToggleFavoriteLoading}
          className={cn('text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200 cursor-pointer', {
            'text-red-500': isFavoriteProduct,
            'opacity-60 cursor-not-allowed': isFavoriteLoading || isToggleFavoriteLoading,
            className,
          })}
        >
          {isFavoriteProduct ? <HiHeart className="h-6 w-6" /> : <HiOutlineHeart className="h-6 w-6" />}
        </button>
      ) : (
        <Link href={`/login/?backUrl=${pathname}`}>
          <button type="button" className="text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200 cursor-pointer">
            <HiOutlineHeart className="h-6 w-6" />
          </button>
        </Link>
      )}
      {isTooltip && <Tooltip text="افزودن به علاقه‌مندی‌ها" />}
    </>
  );
}

function Tooltip({ text }: { text: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  );
}

export default FavoriteProductAction;
