'use client';

import { useState } from 'react';
import { HiOutlineHeart, HiOutlineAdjustments, HiOutlineShare } from 'react-icons/hi';

type Props = {
  productId: number;
};

export default function ProductActions({ productId }: Props) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleAddToFavorite = () => {
    console.log(`افزودن محصول ${productId} به علاقه‌مندی`);
  };

  const handleAddToCompare = () => {
    console.log(`افزودن محصول ${productId} به مقایسه`);
  };

  const handleShare = () => {
    setIsCopied(true);
    console.log(`اشتراک‌گذاری محصول ${productId}`);
    setShowShareMenu((prev) => !prev);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log(`لینک محصول ${productId} کپی شد`);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      {/* دسکتاپ */}
      <div className="hidden lg:block py-2">
        <div className="flex items-center gap-x-4">
          {/* Favorite Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={handleAddToFavorite}
              className="text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <HiOutlineHeart className="h-6 w-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              افزودن به علاقه‌مندی‌ها
            </div>
          </div>

          {/* Compare Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={handleAddToCompare}
              className="text-gray-700 hover:text-yellow-500 dark:text-white transition-colors duration-200"
              aria-label="افزودن به لیست مقایسه"
            >
              <HiOutlineAdjustments className="h-6 w-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              افزودن به لیست مقایسه
            </div>
          </div>

          {/* Share Button */}
          <div className="relative group">
            <button
              type="button"
              onClick={handleShare}
              className="text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200"
              aria-label="اشتراک‌گذاری"
            >
              <HiOutlineShare className="h-6 w-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden w-max rounded bg-zinc-900 px-3 py-1 text-sm text-white group-hover:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              اشتراک‌گذاری
            </div>

            {/* Dropdown Menu */}
            {showShareMenu && (
              <div className="absolute top-10 right-0 z-10 w-48 rounded-lg border bg-white p-2 shadow-md dark:bg-zinc-800 transition-opacity duration-200">
                <button
                  className="flex w-full items-center gap-2 rounded px-2 py-2 text-sky-500 hover:bg-sky-100 dark:hover:bg-zinc-700"
                  onClick={handleCopyLink}
                >
                  <HiOutlineShare className="h-5 w-5" />
                  <span>کپی لینک</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* موبایل */}
      <div className="lg:hidden absolute left-4 top-4 z-15">
        <div className="flex items-center gap-x-4">
          {/* Favorite Button */}
          <div>
            <button
              type="button"
              onClick={handleAddToFavorite}
              className="text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200"
              aria-label="افزودن به علاقه‌مندی‌ها"
            >
              <HiOutlineHeart className="h-6 w-6" />
            </button>
          </div>

          {/* Compare Button */}
          <div>
            <button
              type="button"
              onClick={handleAddToCompare}
              className="text-gray-700 hover:text-yellow-500 dark:text-white transition-colors duration-200"
              aria-label="افزودن به لیست مقایسه"
            >
              <HiOutlineAdjustments className="h-6 w-6" />
            </button>
          </div>

          {/* Share Button */}
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
    </>
  );
}
