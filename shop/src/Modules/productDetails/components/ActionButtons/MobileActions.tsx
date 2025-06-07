'use client';

import { FC } from 'react';
import { HiOutlineHeart, HiOutlineAdjustments, HiOutlineShare } from 'react-icons/hi';
import { useProductActions } from '@/modules/product/hooks/useProductActions';
import ActionButton from '../../../../shared/components/ui/ActionButton';

interface Props {
  productId: string;
}

const MobileActions: FC<Props> = ({ productId }) => {
  const { isCopied, handleAddToFavorite, handleAddToCompare, handleCopyLink } = useProductActions(productId);

  return (
    <div className="lg:hidden absolute left-4 top-4 z-15">
      <div className="flex items-center gap-x-4">
        <ActionButton
          icon={<HiOutlineHeart className="h-6 w-6" />}
          onClick={handleAddToFavorite}
          label="افزودن به علاقه‌مندی‌ها"
          hoverColor="text-red-500"
        />
        <ActionButton
          icon={<HiOutlineAdjustments className="h-6 w-6" />}
          onClick={handleAddToCompare}
          label="افزودن به لیست مقایسه"
          hoverColor="text-yellow-500"
        />
        <div className="relative">
          <ActionButton
            icon={<HiOutlineShare className="h-6 w-6" />}
            onClick={handleCopyLink}
            label="اشتراک‌گذاری"
            hoverColor="text-blue-500"
          />
          {isCopied && (
            <div
              id="notify-copied-social-share-link-mobile"
              className="absolute left-0 top-full mt-2 w-24 rounded-lg bg-zinc-900 px-3 py-2 text-center text-sm font-medium text-white shadow-xs transition-opacity duration-300 dark:bg-zinc-800"
            >
              کپی شد!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileActions;
