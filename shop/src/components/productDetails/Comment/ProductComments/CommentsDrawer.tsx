// 'use client';

// import React, { useState } from 'react';
// import { CommentItem, CommentResponse } from '@/types/commentType';
// import MobileDrawer from '@/components/MobileDrawer';
// import Recommendation from './Recommendation';
// import ReplyCommentFormDrawer from '../ReplyCommentFormDrawer';
// import { useComment } from '@/hooks/reactQuery/useComment';
// import { FaUserCircle } from 'react-icons/fa';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { Pager } from '@/types/pagerType';

// interface CommentsDrawerProps {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
// }

// const PAGE_SIZE = 10;

// function ReplyList({ replies }: { replies: CommentItem[] }) {
//   if (!replies?.length) return null;
//   return (
//     <ul className="mt-3 space-y-3 border-r pr-3">
//       {replies
//         .filter((reply) => reply.isActive)
//         .map((reply) => (
//           <li key={reply.id}>
//             <div className="flex flex-col rounded-lg border border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-3 shadow-sm relative mr-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-5 h-5" />
//                 <span
//                   className={`text-xs rounded-full px-2 py-0.5 font-semibold
//                     ${reply.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
//                 >
//                   {reply.userId ? 'خریدار' : 'کاربر'}
//                 </span>
//               </div>
//               <h6 className="text-xs font-bold text-primary mb-1 truncate">{reply.title}</h6>
//               <p className="line-clamp-4 text-xs text-text/90 mb-1">{reply.content}</p>
//               <span className="text-[10px] text-text/60 mt-auto">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</span>
//             </div>
//           </li>
//         ))}
//     </ul>
//   );
// }

// function CommentsDrawer({ isOpen, onOpen, onClose }: CommentsDrawerProps) {
//   const [page, setPage] = useState(1);
//   const [allComments, setAllComments] = useState<CommentItem[]>([]);
//   const [pager, setPager] = useState<null | Pager>(null);

//   const { data, isLoading } = useComment({
//     params: { page, take: PAGE_SIZE, repliesDepth: 1, includeReplies: true },
//     keepPreviousData: true,
//   });

//   React.useEffect(() => {
//     if (data?.items) {
//       setAllComments((prev) => {
//         const ids = new Set(prev.map((c) => c.id));
//         return [...prev, ...data.items.filter((c: CommentItem) => !ids.has(c.id))];
//       });
//       setPager(data.pager);
//     }
//   }, [data]);

//   // با توجه به hasNextPage از pager
//   const hasMore = !!pager?.hasNextPage;

//   if (isLoading && page === 1) {
//     return (
//       <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
//         <p className="text-center text-text/60">در حال بارگذاری دیدگاه ها...</p>
//       </MobileDrawer>
//     );
//   }

//   if (!allComments || allComments.length === 0) {
//     return (
//       <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
//         <p className="text-center text-text/60">دیدگاهی برای نمایش وجود ندارد.</p>
//       </MobileDrawer>
//     );
//   }

//   return (
//     <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
//       <InfiniteScroll
//         dataLength={allComments.length}
//         next={() => setPage((p) => p + 1)}
//         hasMore={hasMore}
//         loader={<p className="text-center text-text/60 py-2">در حال بارگذاری بیشتر...</p>}
//         scrollableTarget="comments-scroll-area"
//         style={{ overflow: 'visible' }}
//       >
//         <ul id="comments-scroll-area" className="space-y-5">
//           {allComments
//             .filter((comment) => comment.isActive)
//             .map((comment) => (
//               <li key={comment.id}>
//                 <div className="flex flex-col rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-5 shadow-md">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-2">
//                       <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-7 h-7" />
//                       <span
//                         className={`text-xs font-semibold rounded-full px-2 py-0.5
//                         ${comment.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
//                       >
//                         {comment.userId ? 'خریدار' : 'کاربر'}
//                       </span>
//                     </div>
//                     <Recommendation isRecommended={comment.isRecommended} />
//                     <ReplyCommentFormDrawer productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
//                   </div>
//                   <h5 className="text-base font-bold text-primary mb-2 truncate">{comment.title}</h5>
//                   <p className="line-clamp-4 text-sm text-text/90 mb-3">{comment.content}</p>
//                   <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-700">
//                     <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
//                   </div>
//                   {comment.replies && comment.replies.length > 0 && <ReplyList replies={comment.replies} />}
//                 </div>
//               </li>
//             ))}
//         </ul>
//       </InfiniteScroll>
//     </MobileDrawer>
//   );
// }

// export default CommentsDrawer;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CommentItem } from '@/types/commentType';
import MobileDrawer from '@/components/MobileDrawer';
import Recommendation from './Recommendation';
import ReplyCommentFormDrawer from '../ReplyCommentFormDrawer';
import { useComment } from '@/hooks/reactQuery/useComment';
import { FaUserCircle } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Pager } from '@/types/pagerType';

interface CommentsDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const PAGE_SIZE = 10;

function ReplyList({ replies }: { replies: CommentItem[] }) {
  if (!replies?.length) return null;
  return (
    <ul className="mt-3 space-y-3 border-r pr-3">
      {replies
        .filter((reply) => reply.isActive)
        .map((reply) => (
          <li key={reply.id}>
            <div className="flex flex-col rounded-lg border border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-3 shadow-sm relative mr-4">
              <div className="flex items-center gap-2 mb-2">
                <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-5 h-5" />
                <span
                  className={`text-xs rounded-full px-2 py-0.5 font-semibold
                    ${reply.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                >
                  {reply.userId ? 'خریدار' : 'کاربر'}
                </span>
              </div>
              <h6 className="text-xs font-bold text-primary mb-1 truncate">{reply.title}</h6>
              <p className="line-clamp-4 text-xs text-text/90 mb-1">{reply.content}</p>
              <span className="text-[10px] text-text/60 mt-auto">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</span>
            </div>
          </li>
        ))}
    </ul>
  );
}

function CommentsDrawer({ isOpen, onOpen, onClose }: CommentsDrawerProps) {
  const [page, setPage] = useState(1);
  const [allComments, setAllComments] = useState<CommentItem[]>([]);
  const [pager, setPager] = useState<null | Pager>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // reset states when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setPage(1);
      setAllComments([]);
      setPager(null);
    }
  }, [isOpen]);

  const { data, isLoading } = useComment({
    params: { page, take: PAGE_SIZE, repliesDepth: 1, includeReplies: true },
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data?.items) {
      setAllComments((prev) => {
        const ids = new Set(prev.map((c) => c.id));
        return [...prev, ...data.items.filter((c: CommentItem) => !ids.has(c.id))];
      });
      setPager(data.pager);
    }
  }, [data]);

  const loadMoreComments = () => {
    console.log('Loading next page:', page + 1);
    setPage((prevPage) => prevPage + 1);
  };

  // با توجه به hasNextPage از pager
  const hasMore = !!pager?.hasNextPage;

  if (isLoading && page === 1) {
    return (
      <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
        <p className="text-center text-text/60">در حال بارگذاری دیدگاه ها...</p>
      </MobileDrawer>
    );
  }

  if (!allComments || allComments.length === 0) {
    return (
      <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها">
        <p className="text-center text-text/60">دیدگاهی برای نمایش وجود ندارد.</p>
      </MobileDrawer>
    );
  }

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose} onOpen={onOpen} title="دیدگاه ها" className="overflow-hidden">
      <div
        id="scrollableDiv"
        style={{
          height: 'calc(100vh - 120px)',
          overflowY: 'auto',
        }}
        ref={scrollContainerRef}
      >
        <InfiniteScroll
          dataLength={allComments.length}
          next={loadMoreComments}
          hasMore={hasMore}
          loader={<p className="text-center text-text/60 py-4">در حال بارگذاری بیشتر...</p>}
          endMessage={<p className="text-center text-text/60">همه دیدگاه‌ها نمایش داده شده‌اند</p>}
          scrollableTarget="scrollableDiv"
        >
          <ul className="space-y-5 pb-8">
            {allComments
              .filter((comment) => comment.isActive)
              .map((comment) => (
                <li key={comment.id}>
                  <div className="flex flex-col rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-5 shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-7 h-7" />
                        <span
                          className={`text-xs font-semibold rounded-full px-2 py-0.5
                          ${comment.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                        >
                          {comment.userId ? 'خریدار' : 'کاربر'}
                        </span>
                      </div>
                      <Recommendation isRecommended={comment.isRecommended} />
                      <ReplyCommentFormDrawer productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
                    </div>
                    <h5 className="text-base font-bold text-primary mb-2 truncate">{comment.title}</h5>
                    <p className="line-clamp-4 text-sm text-text/90 mb-3">{comment.content}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                      <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                    {comment.replies && comment.replies.length > 0 && <ReplyList replies={comment.replies} />}
                  </div>
                </li>
              ))}
          </ul>
        </InfiniteScroll>
      </div>
    </MobileDrawer>
  );
}

export default CommentsDrawer;
