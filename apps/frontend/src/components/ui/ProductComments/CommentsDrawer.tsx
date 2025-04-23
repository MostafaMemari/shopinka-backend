import React from "react";
import Drawer from "../Drawer";

interface Comment {
  recommendText: string;
  title: string;
  body: string;
  likes: number;
  dislikes: number;
  date: string;
  isBuyer: boolean;
}

interface CommentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ isOpen, onClose, comments }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="دیدگاه ها">
      <ul className="space-y-6">
        {comments.map((comment, index) => (
          <li key={index}>
            <div className="flex h-64 flex-col rounded-lg border px-4 py-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-x-2 text-primary">
                  <svg className="h-5 w-5">
                    <use xlinkHref="#like" />
                  </svg>
                  {comment.recommendText}
                </div>
                <button type="button" className="btn-secondary-nobg">
                  پاسخ
                  <svg className="w-5 h-5">
                    <use xlinkHref="#chevron-left" />
                  </svg>
                </button>
              </div>
              <div className="grow space-y-2">
                <h5 className="text-sm leading-relaxed">{comment.title}</h5>
                <p className="line-clamp-4 text-sm leading-relaxed text-text/90">{comment.body}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                  <button className="relative text-primary">
                    <svg className="h-6 w-6">
                      <use xlinkHref="#like" />
                    </svg>
                    <span className="absolute -right-2 top-6 text-sm">{comment.likes}</span>
                  </button>
                  <button className="relative text-red-500 dark:text-red-400">
                    <svg className="h-6 w-6">
                      <use xlinkHref="#dislike" />
                    </svg>
                    <span className="absolute -right-2 top-6 text-sm">{comment.dislikes}</span>
                  </button>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-xs text-text/60">{comment.date}</div>
                  <span className="h-3 w-px rounded-full bg-background dark:bg-muted/10"></span>
                  <div className="text-xs text-text/60">{comment.isBuyer ? "خریدار" : ""}</div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Drawer>
  );
};

export default CommentsDrawer;
