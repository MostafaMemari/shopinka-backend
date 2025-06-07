'use client';

import { FC } from 'react';
import { HiOutlineHeart, HiOutlineAdjustments, HiOutlineShare } from 'react-icons/hi';

import { useProductActions } from '@/modules/product/hooks/useProductActions';
import ActionButton from '../../../../shared/components/ui/ActionButton';

interface Props {
  productId: string;
}

const DesktopActions: FC<Props> = ({ productId }) => {
  const { showShareMenu, handleAddToFavorite, handleAddToCompare, handleShare, handleCopyLink } = useProductActions(productId);

  return (
    <div className="hidden lg:block py-2">
      <div className="flex items-center gap-x-4">
        <ActionButton
          icon={<HiOutlineHeart className="h-6 w-6" />}
          onClick={handleAddToFavorite}
          label="افزودن به علاقه‌مندی‌ها"
          hoverColor="text-red-500"
          showTooltip
        />
        <ActionButton
          icon={<HiOutlineAdjustments className="h-6 w-6" />}
          onClick={handleAddToCompare}
          label="افزودن به لیست مقایسه"
          hoverColor="text-yellow-500"
          showTooltip
        />
        <div className="relative">
          <ActionButton
            icon={<HiOutlineShare className="h-6 w-6" />}
            onClick={handleShare}
            label="اشتراک‌گذاری"
            hoverColor="text-blue-500"
            showTooltip
          />
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
  );
};

export default DesktopActions;
