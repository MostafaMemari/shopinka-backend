'use client';

import { useRef, useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import Dialog from '@/components/ui/Dialog';
import { AiOutlineComment, AiOutlineLeft } from 'react-icons/ai';
import CommentForm, { CommentFormikType } from './CommentForm';
import { useComment } from '@/hooks/reactQuery/useComment';

interface ReplyCommentFormDialogProps {
  productId: number;
}

const ReplyCommentFormDialog = ({ productId }: ReplyCommentFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useComment({});

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment(
      { ...values, productId, isRecommended: true },
      () => {
        setIsOpen(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
      (error) => {
        console.error('خطا در ارسال فرم:', error);
      },
    );
  };

  const handleSubmit = () => {
    if (formRef.current) formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(true)} className="btn-secondary-nobg cursor-pointer">
        پاسخ
        <AiOutlineLeft className="h-5 w-5" />
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="ثبت دیدگاه جدید"
        actions={
          <button className="btn-primary w-full py-3 text-sm" type="button" onClick={handleSubmit} disabled={isCreateCommentLoading}>
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
