"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import CommentsDrawer from "./CommentsDrawer";
import { useState } from "react";
import { AiOutlineLike, AiOutlineDislike, AiOutlineLeft } from "react-icons/ai";
import { IComment } from "@/lib/types/comments";

interface Props {
  comments: IComment[];
}

export default function MobileCommentsSwiper({ comments }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Swiper
        modules={[FreeMode]}
        slidesPerView={1.1}
        spaceBetween={10}
        freeMode={true}
        breakpoints={{
          360: { slidesPerView: 1.2, spaceBetween: 10 },
          460: { slidesPerView: 1.6, spaceBetween: 10 },
          640: { slidesPerView: 2.2, spaceBetween: 10 },
        }}
      >
        {comments.map((comment) => (
          <SwiperSlide key={comment.id}>
            <div className="flex h-64 flex-col rounded-lg border px-4 py-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div
                  className={`flex items-center gap-x-2 ${comment.isRecommended ? "text-primary" : "text-red-500 dark:text-red-400"}`}
                >
                  {comment.isRecommended ? (
                    <AiOutlineLike className="h-5 w-5" />
                  ) : (
                    <AiOutlineDislike className="h-5 w-5" />
                  )}
                  {comment.isRecommended ? "پیشنهاد میکنم" : "پیشنهاد نمیکنم"}
                </div>
                <button
                  data-modal-target="submit-answers-to-comments-drawer-navigation"
                  data-modal-toggle="submit-answers-to-comments-drawer-navigation"
                  type="button"
                  className="btn-secondary-nobg"
                >
                  پاسخ
                  <AiOutlineLeft />
                </button>
              </div>
              <div className="grow space-y-2">
                <h5 className="text-sm leading-relaxed">{comment.title}</h5>
                <p className="line-clamp-4 text-sm leading-relaxed text-text/90">
                  {comment.content}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <button className="relative text-primary">
                    <AiOutlineLike className="h-6 w-6" />
                    <span className="absolute -right-2 top-6 text-sm">
                      {comment.likes}
                    </span>
                  </button>
                  <button className="relative text-red-500 dark:text-red-400">
                    <AiOutlineDislike className="h-6 w-6" />
                    <span className="absolute -right-2 top-6 text-sm">
                      {comment.dislikes}
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-xs text-text/60">{comment.date}</div>
                  <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
                  <div className="text-xs text-text/60">
                    {comment.isBuyer ? "خریدار" : "کاربر"}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <SwiperSlide>
          <div className="flex h-64 items-center justify-center">
            <button
              aria-controls="mobile-comments-drawer-navigation"
              data-drawer-show="mobile-comments-drawer-navigation"
              data-drawer-placement="bottom"
              data-drawer-target="mobile-comments-drawer-navigation"
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex flex-col items-center justify-center gap-y-4 text-primary"
            >
              <div className="rounded-full border border-emerald-500 p-2 dark:border-emerald-400">
                <AiOutlineLeft className="h-4 w-4" />
              </div>
              <div>مشاهده بیشتر</div>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <CommentsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        comments={comments}
      />
    </div>
  );
}
