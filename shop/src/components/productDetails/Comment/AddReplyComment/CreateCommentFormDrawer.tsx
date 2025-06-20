'use client';

import { useRef, useState } from 'react';
import MobileDrawer from '@/components/ui/MobileDrawer';
import CommentForm, { CommentFormikType } from '../CommentForm';
import { AiOutlineComment } from 'react-icons/ai';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/auth/useAuth';
import Link from 'next/link';

interface CommentFormDrawerProps {
  productId: number;
}

const CommentFormDrawer = ({ productId }: CommentFormDrawerProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();

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
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    <div>
      <MobileDrawer
        title="افزودن نظر جدید"
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        triggerButton={
          <>
            {isLogin ? (
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                <AiOutlineComment className="h-6 w-6" />
                <span>ثبت دیدگاه جدید</span>
              </button>
            ) : (
              <Link href={`/login/?backUrl=${pathname}`}>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer">
                  <AiOutlineComment className="h-6 w-6" />
                  <span>ثبت دیدگاه جدید</span>
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

export default CommentFormDrawer;
