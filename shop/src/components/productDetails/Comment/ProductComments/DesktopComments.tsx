'use client';

import { CommentItem } from '@/types/commentType';
import ReplyCommentFormDialog from '../ReplyCommentFormDialog';
import ReplyCommentFormDrawer from '../ReplyCommentFormDrawer';
import Recommendation from './Recommendation';

interface Props {
  comment: CommentItem;
}

function CommentBox({
  title,
  content,
  createdAt,
  userId,
  isRecommended,
  isReply = false,
  replyActions,
}: {
  title: string;
  content: string;
  createdAt: string;
  userId?: string;
  isRecommended?: boolean;
  isReply?: boolean;
  replyActions?: React.ReactNode;
}) {
  return (
    <div
      className={`
        p-6 
        ${isReply ? 'bg-muted/10 border-r-4 border-primary/60 mr-8' : 'bg-white dark:bg-zinc-900'}
        rounded-xl shadow-sm
        transition
        hover:shadow-lg
      `}
    >
      <div className="flex items-center justify-between gap-2">
        <h5 className="mb-2 leading-relaxed font-semibold xl:text-lg text-primary">{title}</h5>
        {replyActions}
      </div>
      <div className="mb-4 flex items-center gap-x-4 border-b pb-2">
        {typeof isRecommended !== 'undefined' && <Recommendation isRecommended={isRecommended} />}
        <div className="flex items-center gap-x-2 text-xs text-text/60">
          <span className="bg-gray-100 dark:bg-muted/20 rounded-full px-2 py-0.5 flex items-center gap-1">{'کاربر'}</span>
          <span className="h-3 w-px bg-gray-200 dark:bg-muted/10" />
          <span>{new Date(createdAt).toLocaleDateString('fa-IR')}</span>
        </div>
      </div>
      <div className="mb-4">
        <p className="line-clamp-4 text-sm text-text/90">{content}</p>
      </div>
    </div>
  );
}

export default function DesktopComments({ comment }: Props) {
  return (
    <li className="space-y-4">
      <CommentBox
        title={comment.title}
        content={comment.content}
        createdAt={comment.createdAt}
        isRecommended={comment.isRecommended}
        replyActions={
          <>
            <div className="hidden md:block">
              <ReplyCommentFormDialog productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
            </div>
            <div className="md:hidden">
              <ReplyCommentFormDrawer productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
            </div>
          </>
        }
      />

      {comment.parentId === null && comment.replies?.length > 0 && (
        <ul className="space-y-3 border-r border-dashed border-primary/30 pr-2">
          {comment.replies
            ?.filter((reply) => reply.isActive)
            .map((reply) => (
              <li key={reply.id}>
                <CommentBox title={reply.title} content={reply.content} createdAt={reply.createdAt} isReply />
              </li>
            ))}
        </ul>
      )}
    </li>
  );
}
