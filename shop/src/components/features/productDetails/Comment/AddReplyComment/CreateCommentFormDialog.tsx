'use client';

import { useRef, useState } from 'react';
import { MdOutlineAddLocationAlt } from 'react-icons/md';
import Dialog from '@/components/ui/Dialog';
import { AiOutlineComment } from 'react-icons/ai';
import CommentForm, { CommentFormikType } from '../CommentForm';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

interface CommentFormDialogProps {
  productId: number;
}

const CommentFormDialog = ({ productId }: CommentFormDialogProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment(
      { ...values, productId },
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

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="افزودن نظر جدید"
        icon={
          <div className="bg-primary/10 w-full rounded-full">
            <MdOutlineAddLocationAlt className="h-6 w-6 text-primary" />
          </div>
        }
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

export default CommentFormDialog;
