'use client';

import { CommentItem } from '@/types/commentType';
import ReplyCommentFormDialog from '../ReplyCommentFormDialog';
import ReplyCommentFormDrawer from '../ReplyCommentFormDrawer';
import Recommendation from './Recommendation';

interface Props {
  comment: CommentItem;
}

export default function DesktopComments({ comment }: Props) {
  return (
    <li className="space-y-2">
      <div className="py-6">
        <div className="flex items-center justify-between gap-2">
          <h5 className="mb-4 leading-relaxed xl:text-lg">{comment.title}</h5>
          <>
            <div className="hidden md:block">
              <ReplyCommentFormDialog productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
            </div>
            <div className="md:hidden flex justify-between items-center w-full">
              <ReplyCommentFormDrawer productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
            </div>
          </>
        </div>
        <div className="mb-6 flex items-center gap-x-4 border-b pb-2">
          <Recommendation isRecommended={comment.isRecommended} />
          <div className="flex items-center gap-x-2">
            <div className="text-sm text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</div>
            <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div className="text-sm text-text/60">{comment.userId ? 'خریدار' : 'کاربر'}</div>
          </div>
        </div>
        <div className="mb-6 border-b pb-6">
          <p className="line-clamp-4 text-sm text-text/90">{comment.content}</p>
        </div>
      </div>
      {comment.parentId === null && (
        <ul className="space-y-2 border-r">
          {comment.replies
            ?.filter((reply) => reply.isActive)
            .map((reply) => (
              <li key={reply.id}>
                <div className="py-6 pr-8 border-r dark:border-white/10">
                  <div className="flex items-center justify-between">
                    <h5 className="mb-4 leading-relaxed xl:text-lg">{reply.title}</h5>
                  </div>
                  <div className="mb-6 flex items-center gap-x-4 border-b pb-6">
                    <div className="flex items-center gap-x-2">
                      <div className="text-sm text-text/60">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</div>
                      <span className="h-3 w-px rounded-full bg-gray-200 dark:bg-muted/10"></span>
                      <div className="text-sm text-text/60">{reply.userId ? 'خریدار' : 'کاربر'}</div>
                    </div>
                  </div>
                  <div className="mb-6 border-b pb-6">
                    <p className="line-clamp-4 text-sm text-text/90">{reply.content}</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
