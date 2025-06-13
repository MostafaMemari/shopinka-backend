'use client';

import React from 'react';
import { CommentItem } from '@/types/commentType';
import MobileDrawer from '@/components/MobileDrawer';
import Recommendation from './Recommendation';
import ReplyCommentFormDrawer from '../ReplyCommentFormDrawer';
import { useComment } from '@/hooks/reactQuery/useComment';

interface CommentsDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function CommentsDrawer({ isOpen, onOpen, onClose }: CommentsDrawerProps) {
  const { data, isLoading } = useComment({});

  const comments: CommentItem[] = data?.items || [];
  if (isLoading) {
    return (
      <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
        <p className="text-center text-text/60">در حال بارگذاری دیدگاه ها...</p>
      </MobileDrawer>
    );
  }

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
                  <Recommendation isRecommended={comment.isRecommended} />

                  <ReplyCommentFormDrawer productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
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

export default CommentsDrawer;
