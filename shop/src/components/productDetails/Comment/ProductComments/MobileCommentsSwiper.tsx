'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import CommentsDrawer from './CommentsDrawer';
import { useEffect, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import { CommentItem } from '@/types/commentType';
import Recommendation from './Recommendation';

interface Props {
  comments: CommentItem[];
  onOpen?: () => void;
  onClose?: () => void;
  isOpen: boolean;
}

export default function MobileCommentsSwiper({ comments, onOpen, onClose, isOpen }: Props) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(isOpen);

  useEffect(() => {
    setIsOpenDrawer(isOpen);
  }, [isOpen]);

  const drawerHandlers = {
    onOpen: () => {
      setIsOpenDrawer(true);
      if (onOpen) onOpen();
    },
    onClose: () => {
      setIsOpenDrawer(false);
      if (onClose) onClose();
    },
  };

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
        {comments
          .filter((comment) => comment.isActive)
          .map((comment) => (
            <SwiperSlide key={comment.id}>
              <div className="flex h-52 flex-col rounded-lg border px-4 py-6">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <Recommendation isRecommended={comment.isRecommended} />
                </div>
                <div className="grow space-y-2">
                  <h5 className="text-sm leading-relaxed">{comment.title}</h5>
                  <p className="line-clamp-4 text-sm leading-relaxed text-text/90">{comment.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className="text-xs text-text/60">{comment.userId ? 'خریدار' : 'کاربر'}</div>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <div className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</div>
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
              onClick={drawerHandlers.onOpen}
              className="flex flex-col items-center justify-center gap-y-4 text-primary"
            >
              <div className="rounded-full border border-primary p-2">
                <AiOutlineLeft className="h-4 w-4" />
              </div>
              <div>مشاهده بیشتر</div>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <CommentsDrawer isOpen={isOpenDrawer} onOpen={drawerHandlers.onOpen} onClose={drawerHandlers.onClose} />
    </div>
  );
}
