'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { useToggleFavorite } from '@/hooks/reactQuery/favorite/useToggleFavorite';
import { useProductFavorite } from '@/hooks/reactQuery/product/useProduct';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineHeart, HiOutlineAdjustments, HiOutlineShare, HiHeart } from 'react-icons/hi';

type Props = {
  productId: number;
};

export default function ProductActions({ productId }: Props) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { isLogin } = useAuth();
  const pathname = usePathname();
  const { data: isFavoriteProduct, refetch, isLoading: isFavoriteLoading } = useProductFavorite({ productId });
  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const handleAddToFavorite = () => {
    if (isToggleFavoriteLoading) return;
    favoriteToggle(productId, refetch);
  };

  const handleAddToCompare = () => {
    console.log(`افزودن محصول ${productId} به مقایسه`);
  };

  const handleShare = () => {
    setShowShareMenu((prev) => !prev);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <DesktopActions
        isLogin={isLogin}
        pathname={pathname}
        isFavoriteProduct={isFavoriteProduct}
        isFavoriteLoading={isFavoriteLoading}
        isToggleFavoriteLoading={isToggleFavoriteLoading}
        handleAddToFavorite={handleAddToFavorite}
        handleAddToCompare={handleAddToCompare}
        handleShare={handleShare}
        showShareMenu={showShareMenu}
        handleCopyLink={handleCopyLink}
        isCopied={isCopied}
      />
      <MobileActions
        isFavoriteLoading={isFavoriteLoading}
        isToggleFavoriteLoading={isToggleFavoriteLoading}
        handleAddToFavorite={handleAddToFavorite}
        handleAddToCompare={handleAddToCompare}
        handleCopyLink={handleCopyLink}
        isCopied={isCopied}
      />
    </>
  );
}

type DesktopActionsProps = {
  isLogin: boolean;
  pathname: string;
  isFavoriteProduct: boolean;
  isFavoriteLoading: boolean;
  isToggleFavoriteLoading: boolean;
  handleAddToFavorite: () => void;
  handleAddToCompare: () => void;
  handleShare: () => void;
  showShareMenu: boolean;
  handleCopyLink: () => void;
  isCopied: boolean;
};

function DesktopActions({
  isLogin,
  pathname,
  isFavoriteProduct,
  isFavoriteLoading,
  isToggleFavoriteLoading,
  handleAddToFavorite,
  handleAddToCompare,
  handleShare,
  showShareMenu,
  handleCopyLink,
  isCopied,
}: DesktopActionsProps) {
  return (
    <div className="hidden lg:block py-2">
      <div className="flex items-center gap-x-4">
        {/* علاقه‌مندی */}
        <div className="relative group">
          {isLogin ? (
            <button
              type="button"
              onClick={handleAddToFavorite}
              disabled={isFavoriteLoading || isToggleFavoriteLoading}
              className={cn('text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200', {
                'text-red-500': isFavoriteProduct,
                'opacity-60 cursor-not-allowed': isFavoriteLoading || isToggleFavoriteLoading,
              })}
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              {isFavoriteLoading || isToggleFavoriteLoading ? (
                <Spinner className="h-6 w-6" />
              ) : isFavoriteProduct ? (
                <HiHeart className="h-6 w-6" />
              ) : (
                <HiOutlineHeart className="h-6 w-6" />
              )}
            </button>
          ) : (
            <Link href={`/login/?backUrl=${pathname}`}>
              <button
                type="button"
                className="text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200"
                aria-label="افزودن به علاقه‌مندی‌ها"
              >
                <HiOutlineHeart className="h-6 w-6" />
              </button>
            </Link>
          )}
          <Tooltip text="افزودن به علاقه‌مندی‌ها" />
        </div>

        {/* مقایسه */}
        <div className="relative group">
          <button
            type="button"
            onClick={handleAddToCompare}
            className="text-gray-700 hover:text-yellow-500 dark:text-white transition-colors duration-200"
            aria-label="افزودن به لیست مقایسه"
          >
            <HiOutlineAdjustments className="h-6 w-6" />
          </button>
          <Tooltip text="افزودن به لیست مقایسه" />
        </div>

        {/* اشتراک‌گذاری */}
        <div className="relative group">
          <button
            type="button"
            onClick={handleShare}
            className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
            aria-label="اشتراک‌گذاری"
          >
            <HiOutlineShare className="h-6 w-6" />
          </button>
          <Tooltip text="اشتراک‌گذاری" />
          {showShareMenu && (
            <div className="absolute top-10 right-0 z-10 w-48 rounded-lg border bg-white p-2 shadow-md dark:bg-zinc-800 transition-opacity duration-200">
              <button
                className="flex w-full items-center gap-2 rounded px-2 py-2 text-sky-500 hover:bg-sky-100 dark:hover:bg-zinc-700"
                onClick={handleCopyLink}
              >
                <HiOutlineShare className="h-5 w-5" />
                <span>کپی لینک</span>
              </button>
              {isCopied && <div className="mt-2 text-xs text-center text-green-600 dark:text-green-400">کپی شد!</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type MobileActionsProps = {
  isFavoriteLoading: boolean;
  isToggleFavoriteLoading: boolean;
  handleAddToFavorite: () => void;
  handleAddToCompare: () => void;
  handleCopyLink: () => void;
  isCopied: boolean;
};
function MobileActions({
  isFavoriteLoading,
  isToggleFavoriteLoading,
  handleAddToFavorite,
  handleAddToCompare,
  handleCopyLink,
  isCopied,
}: MobileActionsProps) {
  return (
    <div className="lg:hidden absolute left-8 top-8 z-15">
      <div className="flex items-center gap-x-4">
        {/* علاقه‌مندی */}
        <button
          type="button"
          onClick={handleAddToFavorite}
          disabled={isFavoriteLoading || isToggleFavoriteLoading}
          className={cn('text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200', {
            'opacity-60 cursor-not-allowed': isFavoriteLoading || isToggleFavoriteLoading,
          })}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          {isFavoriteLoading || isToggleFavoriteLoading ? <Spinner className="h-6 w-6" /> : <HiOutlineHeart className="h-6 w-6" />}
        </button>

        {/* مقایسه */}
        <button
          type="button"
          onClick={handleAddToCompare}
          className="text-gray-700 hover:text-yellow-500 dark:text-white transition-colors duration-200"
          aria-label="افزودن به لیست مقایسه"
        >
          <HiOutlineAdjustments className="h-6 w-6" />
        </button>

        {/* اشتراک‌گذاری */}
        <div className="relative">
          <button
            type="button"
            onClick={handleCopyLink}
            className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
            aria-label="اشتراک‌گذاری"
          >
            <HiOutlineShare className="h-6 w-6" />
          </button>
          {isCopied && (
            <div
              id="notify-copied-social-share-link-mobile"
              className="absolute left-0 top-full mt-2 w-24 rounded-lg bg-zinc-900 px-3 py-2 text-center text-sm font-medium text-white shadow-xs transition-opacity duration-300 dark:bg-zinc-800"
            >
              کپی شد !
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tooltip component
function Tooltip({ text }: { text: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {text}
    </div>
  );
}

// Spinner component
function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cn('animate-spin text-primary', className)} width={24} height={24} viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
