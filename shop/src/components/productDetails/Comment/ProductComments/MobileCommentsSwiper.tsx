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
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  comments: CommentItem[];
  onOpen?: () => void;
  onClose?: () => void;
  isOpen: boolean;
  productId: number;
}

export default function MobileCommentsSwiper({ comments, onOpen, onClose, isOpen, productId }: Props) {
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
              <div className="flex flex-col h-56 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-5 shadow-md transition hover:shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-6 h-6" />
                    <span className="bg-gray-100 text-xs rounded-full px-2 py-0.5 flex items-center gap-1">{'کاربر'}</span>
                  </div>
                  <Recommendation isRecommended={comment.isRecommended} />
                </div>
                <h5 className="text-base font-bold text-primary mb-1 truncate">{comment.title}</h5>
                <p className="line-clamp-4 text-sm text-text/90 mb-2">{comment.content}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        <SwiperSlide>
          <div className="flex h-56 items-center justify-center">
            <button
              type="button"
              onClick={drawerHandlers.onOpen}
              className="flex flex-col items-center justify-center gap-y-2 text-primary"
            >
              <div className="rounded-full border border-primary p-2 bg-primary/10">
                <AiOutlineLeft className="h-4 w-4" />
              </div>
              <div className="text-sm font-semibold">مشاهده بیشتر</div>
            </button>
          </div>
        </SwiperSlide>
      </Swiper>

      <CommentsDrawer isOpen={isOpenDrawer} onOpen={drawerHandlers.onOpen} onClose={drawerHandlers.onClose} productId={productId} />
    </div>
  );
}
