import { IComment } from '@/lib/types/comments';
import { AiOutlineLike, AiOutlineDislike, AiOutlineLeft } from 'react-icons/ai';

interface Props {
  comment: IComment;
}

export default function DesktopComments({ comment }: Props) {
  return (
    <li className="space-y-2">
      <div className="py-6">
        <div className="flex items-center justify-between gap-2">
          <h5 className="mb-4 leading-relaxed xl:text-lg">{comment.title}</h5>
          <button
            data-modal-target="submit-answers-to-comments-drawer-navigation"
            data-modal-toggle="submit-answers-to-comments-drawer-navigation"
            type="button"
            className="btn-secondary-nobg"
          >
            پاسخ
            <AiOutlineLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex items-center gap-x-4 border-b pb-2">
          <div className={`flex items-center gap-x-2 ${comment.isRecommended ? 'text-primary' : 'text-red-500 dark:text-red-400'}`}>
            {comment.isRecommended ? <AiOutlineLike className="h-5 w-5" /> : <AiOutlineDislike className="h-5 w-5" />}
            {comment.isRecommended ? 'پیشنهاد میکنم' : 'پیشنهاد نمیکنم'}
          </div>
          <div className="flex items-center gap-x-2">
            <div className="text-sm text-text/60">{comment.date}</div>
            <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
            <div className="text-sm text-text/60">{comment.isBuyer ? 'خریدار' : 'کاربر'}</div>
          </div>
        </div>
        <div className="mb-6 border-b pb-6">
          <p className="line-clamp-4 text-sm text-text/90">{comment.content}</p>
        </div>
        <div className="flex items-center justify-end gap-x-8">
          <div className="text-sm text-text/60">آیا این دیدگاه برایتان مفید بود؟</div>
          <button className="flex items-center gap-x-2 text-primary transition-all duration-200 hover:text-emerald-400 dark:hover:text-primary">
            <span className="text-sm">{comment.likes}</span>
            <AiOutlineLike className="h-6 w-6" />
          </button>
          <button className="flex items-center gap-x-2 text-red-500 transition-all duration-200 hover:text-red-400 dark:text-red-400 dark:hover:text-red-500">
            <span className="text-sm">{comment.dislikes}</span>
            <AiOutlineDislike className="h-6 w-6" />
          </button>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <ul className="space-y-2 border-r">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <div className="py-6 pr-8 border-r dark:border-white/10">
                <div className="flex items-center justify-between">
                  <h5 className="mb-4 leading-relaxed xl:text-lg">{reply.title}</h5>
                </div>
                <div className="mb-6 flex items-center gap-x-4 border-b pb-6">
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm text-text/60">{reply.date}</div>
                    <span className="h-3 w-px rounded-full bg-grauy-200 /10"></span>
                    <div className="text-sm text-text/60">{reply.isBuyer ? 'خریدار' : 'کاربر'}</div>
                  </div>
                </div>
                <div className="mb-6 border-b pb-6">
                  <p className="line-clamp-4 text-sm text-text/90">{reply.content}</p>
                </div>
                <div className="flex items-center justify-end gap-x-8">
                  <div className="text-sm text-text/60">آیا این دیدگاه برایتان مفید بود؟</div>
                  <button className="flex items-center gap-x-2 text-primary transition-all duration-200 hover:text-emerald-400 dark:hover:text-primary">
                    <span className="text-sm">{reply.likes}</span>
                    <AiOutlineLike className="h-6 w-6" />
                  </button>
                  <button className="flex items-center gap-x-2 text-red-500 transition-all duration-200 hover:text-red-400 dark:text-red-400 dark:hover:text-red-500">
                    <span className="text-sm">{reply.dislikes}</span>
                    <AiOutlineDislike className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
