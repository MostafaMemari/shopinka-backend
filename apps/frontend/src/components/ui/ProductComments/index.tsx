import React from "react";
import MobileCommentsSwiper from "./MobileCommentsSwiper";
import { IComment } from "@/lib/types/comments";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Comment from "../Comments";
import SuggestionRadio from "../SuggestionRadio";
interface ProductCommentsProps {
  comments: IComment[];
}

const ProductComments = ({ comments }: ProductCommentsProps) => {
  return (
    <div className="py-6" id="comments">
      <div className="relative mb-16 w-fit text-xl font-medium">
        دیدگاه ها
        <span className="absolute right-0 top-10 h-[3px] w-full rounded-full bg-primary"></span>
      </div>

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
                {comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}
              </ul>
              {/* Pagination */}
              <div className="flex items-center justify-center gap-x-4 md:justify-end">
                <a className="pagination-button flex items-center justify-center" href="#">
                  <AiOutlineRight className="h-5 w-5" />
                </a>
                <div className="flex items-center gap-x-2">
                  <a className="pagination-button pagination-button-active" href="#">
                    1
                  </a>
                  <p className="text-sm text-text/60">...</p>
                  <a className="pagination-button" href="#">
                    3
                  </a>
                  <a className="pagination-button" href="#">
                    4
                  </a>
                  <p className="text-sm text-text/60">...</p>
                  <a className="pagination-button" href="#">
                    10
                  </a>
                </div>
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-all duration-200 hover:bg-primary hover:text-white dark:hover:bg-emerald-600"
                  href="#"
                >
                  <AiOutlineLeft className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Mobile Comments */}
            <MobileCommentsSwiper comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComments;
