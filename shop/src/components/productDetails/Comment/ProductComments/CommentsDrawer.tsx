'use client';

import React from 'react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineLeft } from 'react-icons/ai';
import { CommentItem } from '@/types/commentType';
import MobileDrawer from '@/components/MobileDrawer';

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  comments: CommentItem[];
}

export default function CommentsDrawer({ isOpen, onOpen, onClose, comments }: Props) {
  if (!comments || comments.length === 0) {
    return (
      <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
        <p className="text-center text-text/60">دیدگاهی برای نمایش وجود ندارد.</p>
      </MobileDrawer>
    );
  }

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
      <ul className="space-y-6">
        {comments
          .filter((comment) => comment.isActive)
          .map((comment) => (
            <li key={comment.id}>
              <div className="flex h-64 flex-col rounded-lg border px-4 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex items-center gap-x-2 ${comment.isRecommended ? 'text-primary' : 'text-red-500 dark:text-red-400'}`}>
                    {comment.isRecommended ? <AiOutlineLike className="h-5 w-5" /> : <AiOutlineDislike className="h-5 w-5" />}
                    {comment.isRecommended ? 'پیشنهاد میکنم' : 'پیشنهاد نمیکنم'}
                  </div>
                  <button type="button" className="btn-secondary-nobg">
                    پاسخ
                    <AiOutlineLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="grow space-y-2">
                  <h5 className="text-sm leading-relaxed">{comment.title}</h5>
                  <p className="line-clamp-4 text-sm leading-relaxed text-text/90">{comment.content}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</div>
                    <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
                    <div className="text-xs text-text/60">{comment.userId ? 'خریدار' : 'کاربر'}</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </MobileDrawer>
  );
}
