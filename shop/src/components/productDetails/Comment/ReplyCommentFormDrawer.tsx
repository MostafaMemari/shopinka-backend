'use client';

import { useRef, useState } from 'react';
import MobileDrawer from '@/components/MobileDrawer';
import CommentForm, { CommentFormikType } from './CommentForm';
import { useComment } from '@/hooks/reactQuery/useComment';
import { AiOutlineLeft } from 'react-icons/ai';

interface ReplyCommentFormDrawerProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

const ReplyCommentFormDrawer = ({ productId, parentId, commentTitle }: ReplyCommentFormDrawerProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useComment({});

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment(
      { ...values, productId, parentId },
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
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div>
      <MobileDrawer
        title={`پاسخ به دیدگاه "${commentTitle}"`}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        triggerButton={
          <button type="button" className="btn-secondary-nobg cursor-pointer">
            پاسخ
            <AiOutlineLeft className="h-5 w-5" />
          </button>
        }
        footerActions={
          <button className="btn-primary w-full py-3 text-sm " type="button" onClick={handleSubmit} disabled={isCreateCommentLoading}>
            {isCreateCommentLoading ? 'در حال ثبت' : 'ارسال دیدگاه'}
          </button>
        }
      >
        <CommentForm onSubmit={handleFormSubmit} ref={formRef} />
      </MobileDrawer>
    </div>
  );
};

export default ReplyCommentFormDrawer;
