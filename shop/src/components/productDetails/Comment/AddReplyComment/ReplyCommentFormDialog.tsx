'use client';

import { useRef, useState } from 'react';
import Dialog from '@/components/ui/Dialog';
import { AiOutlineLeft } from 'react-icons/ai';
import CommentForm, { CommentFormikType } from '../CommentForm';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

interface ReplyCommentFormDialogProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

const ReplyCommentFormDialog = ({ productId, parentId, commentTitle }: ReplyCommentFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment({ ...values, productId, isRecommended: true, parentId }, () => {
      setIsOpen(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    });
  };

  const handleSubmit = () => {
    if (formRef.current) formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div>
      {isLogin ? (
        <button type="button" onClick={() => setIsOpen(true)} className="btn-secondary-nobg cursor-pointer">
          پاسخ
          <AiOutlineLeft className="h-5 w-5" />
        </button>
      ) : (
        <Link href={`/login/?backUrl=${pathname}`}>
          <button type="button" onClick={() => setIsOpen(true)} className="btn-secondary-nobg cursor-pointer">
            پاسخ
            <AiOutlineLeft className="h-5 w-5" />
          </button>
        </Link>
      )}

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`پاسخ به دیدگاه "${commentTitle}"`}
        actions={
          <button
            className="btn-primary w-full py-3 text-sm cursor-pointer"
            type="button"
            onClick={handleSubmit}
            disabled={isCreateCommentLoading}
          >
            {isCreateCommentLoading ? 'در حال ثبت' : 'ارسال دیدگاه'}
          </button>
        }
        size="xl"
      >
        <div className="mt-4">
          <CommentForm onSubmit={handleFormSubmit} ref={formRef} />
        </div>
      </Dialog>
    </div>
  );
};

export default ReplyCommentFormDialog;
