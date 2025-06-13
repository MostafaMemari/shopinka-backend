'use client';

import React, { useState } from 'react';
import MobileCommentsSwiper from './MobileCommentsSwiper';
import Pagination from '@/components/ui/Pagination';
import DesktopComments from './DesktopComments';
import { CommentItem } from '@/types/commentType';
import { useComment } from '@/hooks/reactQuery/useComment';
import CartStatus from '@/components/CartStatus copy';
import { MdOutlineComment } from 'react-icons/md';
import CommentFormDialog from '../CommentFormDialog';
import CommentFormDrawer from '../CommentFormDrawer';
import { AiOutlineLeft } from 'react-icons/ai';

interface Props {
  productId: number;
}

export default function ProductComments({ productId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);

  const { data, isLoading, error } = useComment({
    params: { productId, page: currentPage, pageSize: 10 },
    staleTime: 1 * 60 * 1000,
  });

  const comments: CommentItem[] = data?.items || [];

  const handleOpenDrawer = () => {
    setIsSwiperOpen(true);
  };

  return (
    <div className="py-2" id="comments">
      {isLoading || error ? (
        <CartStatus
          cartItems={[]}
          error={error}
          isLoading={isLoading}
          emptyMessage="هیچ نظری ثبت نشده است!"
          errorMessage="خطا در بارگذاری نظرات"
          shopButtonText="رفتن به فروشگاه"
          shopLink="/shop"
        />
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <div className="hidden md:block">
              <CommentFormDialog productId={productId} />
            </div>
            <div className="md:hidden flex justify-between items-center w-full">
              <div>
                <CommentFormDrawer productId={productId} />
              </div>
              <div onClick={handleOpenDrawer} className="text-sm flex items-center gap-x-1 text-blue-500 cursor-pointer">
                {`مشاهده ${comments.length} دیدگاه`} <AiOutlineLeft className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {comments?.length !== 0 && (
        <MobileCommentsSwiper
          onOpen={handleOpenDrawer}
          onClose={() => setIsSwiperOpen(false)}
          comments={comments.filter((c) => c.isActive && c.parentId === null)}
          isOpen={isSwiperOpen}
        />
      )}
      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="text-text/60">در حال بارگذاری دیدگاه ها...</div>
        </div>
      )}
      <div>
        <div className="order-first col-span-12 mb-10 md:order-last md:col-span-8 lg:col-span-9" id="commentsContainer">
          <div className="hidden md:block">
            <ul className="mb-8 space-y-4 divide-gray-200 dark:divide-white/10">
              {comments
                ?.filter((comment) => comment.isActive && comment.parentId === null)
                .map((comment) => <DesktopComments key={comment.id} comment={comment} />)}
            </ul>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(comments.filter((c) => c.isActive && c.parentId === null).length / 10)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
