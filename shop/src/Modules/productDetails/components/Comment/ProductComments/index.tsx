'use client';

import React, { useState } from 'react';
import MobileCommentsSwiper from './MobileCommentsSwiper';
import { IComment } from '@/lib/types/comments';
import SuggestionRadio from '@/modules/productDetails/components/Comment/ProductComments/SuggestionRadio';
import Pagination from '@/components/ui/Pagination';
import DesktopComments from './DesktopComments';

interface Props {
  comments: IComment[];
}

export default function ProductComments({ comments }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="py-6" id="comments">
      {/* <div className="relative mb-16 w-fit text-xl font-medium">
        دیدگاه ها
        <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary"></span>
      </div> */}

      <div>
        <div className="grid grid-cols-12 gap-y-8 md:gap-8">
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
                {comments?.map((comment) => <DesktopComments key={comment.id} comment={comment} />)}
              </ul>

              {/* Pagination */}
              <Pagination currentPage={1} totalPages={2} />
            </div>

            {/* Mobile Comments */}
            <MobileCommentsSwiper comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}
