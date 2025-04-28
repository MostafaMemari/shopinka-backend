import React from "react";
import { AiOutlineLike, AiOutlineDislike, AiOutlineLeft } from "react-icons/ai";
import { IComment } from "@/lib/types/comments";
import Drawer from "@/components/ui/Drawer";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  comments: IComment[];
}

export default function CommentsDrawer({ isOpen, onClose, comments }: Props) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="دیدگاه ها">
      <ul className="space-y-6">
        {comments.map((comment, index) => (
          <li key={index}>
            <div className="flex h-64 flex-col rounded-lg border px-4 py-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`flex items-center gap-x-2 ${comment.isRecommended ? "text-primary" : "text-red-500 dark:text-red-400"}`}>
                  {comment.isRecommended ? <AiOutlineLike className="h-5 w-5" /> : <AiOutlineDislike className="h-5 w-5" />}
                  {comment.isRecommended ? "پیشنهاد میکنم" : "پیشنهاد نمیکنم"}
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
                <div className="flex items-center gap-x-4">
                  <button className="relative text-primary">
                    <AiOutlineLike className="h-6 w-6" />
                    <span className="absolute -right-2 top-6 text-sm">{comment.likes}</span>
                  </button>
                  <button className="relative text-red-500 dark:text-red-400">
                    <AiOutlineDislike className="h-6 w-6" />
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
}
