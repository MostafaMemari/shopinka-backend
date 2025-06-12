'use client';

import React, { useState } from 'react';
import MobileCommentsSwiper from './MobileCommentsSwiper';
import SuggestionRadio from '@/components/productDetails/Comment/ProductComments/SuggestionRadio';
import Pagination from '@/components/ui/Pagination';
import DesktopComments from './DesktopComments';
import { CommentItem } from '@/types/commentType';
import { useComments } from '@/hooks/reactQuery/useComment';

interface ProductCommentsProps {
  comments: CommentItem[];
}

export default function ProductComments({ comments = [] }: ProductCommentsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useComments({});

  return (
    <div className="py-2" id="comments">
      {comments?.length !== 0 && <MobileCommentsSwiper comments={comments.filter((c) => c.isActive && c.parentId === null)} />}

      <div>
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <div className="grid grid-cols-2 gap-4 md:sticky md:top-32">
            <div className="text-lg">ثبت دیدگاه</div>

            <div className="col-span-2">
              <div className="mb-4 text-sm text-text/60">این محصول را به دیگران پیشنهاد</div>
              <SuggestionRadio />
            </div>

            <div className="col-span-2">
              <label htmlFor="comment" className="relative block rounded-lg border shadow-base">
                <textarea
                  id="comment"
                  rows={3}
                  className="main-scroll peer w-full rounded-lg border-none bg-transparent px-4 py-3 placeholder-transparent focus:outline-hidden focus:ring-0"
                  placeholder="متن دیدگاه"
                ></textarea>
                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-muted px-2 py-0.5 text-sm text-text/90 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm">
                  متن دیدگاه
                </span>
              </label>
            </div>

            <div className="col-span-2 flex justify-end">
              <button className="btn-primary w-full px-4 py-2 md:w-auto">ارسال دیدگاه</button>
            </div>
          </div>
        </div>

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
