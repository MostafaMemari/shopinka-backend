'use client';

import { useRef, useState } from 'react';
import MobileDrawer from '@/components/ui/MobileDrawer';
import CommentForm, { CommentFormikType } from '../CommentForm';
import { AiOutlineLeft } from 'react-icons/ai';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

interface ReplyCommentFormDrawerProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

const ReplyCommentFormDrawer = ({ productId, parentId, commentTitle }: ReplyCommentFormDrawerProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();

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
          <>
            {isLogin ? (
              <button onClick={() => setIsOpen(true)} type="button" className="btn-secondary-nobg cursor-pointer">
                پاسخ
                <AiOutlineLeft className="h-5 w-5" />
              </button>
            ) : (
              <Link href={`/login/?backUrl=${pathname}`}>
                <button type="button" className="btn-secondary-nobg cursor-pointer">
                  پاسخ
                  <AiOutlineLeft className="h-5 w-5" />
                </button>
              </Link>
            )}
          </>
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
