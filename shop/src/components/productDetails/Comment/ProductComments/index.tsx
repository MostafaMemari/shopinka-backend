'use client';

import React, { useState } from 'react';
import MobileCommentsSwiper from './MobileCommentsSwiper';
import Pagination from '@/components/ui/Pagination';
import DesktopComments from './DesktopComments';
import { CommentItem } from '@/types/commentType';
import { useComment } from '@/hooks/reactQuery/useComment';
import CartStatus from '@/components/CartStatus copy';
import CommentFormDialog from '../CreateCommentFormDialog';
import CommentFormDrawer from '../CreateCommentFormDrawer';
import { AiOutlineLeft } from 'react-icons/ai';

interface Props {
  productId: number;
}

export default function ProductComments({ productId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSwiperOpen, setIsSwiperOpen] = useState(false);

  const { data, isLoading, error } = useComment({
    params: { productId, page: currentPage, take: 10, repliesDepth: 1, includeReplies: true },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const comments: CommentItem[] = data?.items || [];
  const totalPages = data?.pager?.totalPages || 1;

  const handleOpenDrawer = () => {
    setIsSwiperOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <div onClick={handleOpenDrawer} className="text-sm flex items-center gap-x-1 text-primary cursor-pointer">
                {`مشاهده ${comments.length} دیدگاه`} <AiOutlineLeft className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {comments?.length !== 0 && (
        <MobileCommentsSwiper onOpen={handleOpenDrawer} onClose={() => setIsSwiperOpen(false)} comments={comments} isOpen={isSwiperOpen} />
      )}

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <div className="text-text/60">در حال بارگذاری دیدگاه‌ها...</div>
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

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  );
}
