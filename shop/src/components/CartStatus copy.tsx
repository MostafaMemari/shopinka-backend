'use client';

import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';
import LoadingSpinner from './ui/LoadingSpinner';

interface CartItem {
  id: string | number;
}

interface CartStatusProps {
  isLoading?: boolean;
  error?: Error | null;
  cartItems?: CartItem[];
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  shopLink?: string;
  shopButtonText?: string;
}

const CartStatus: React.FC<CartStatusProps> = ({
  isLoading = false,
  error = null,
  cartItems = [],
  loadingMessage,
  errorMessage,
  emptyMessage,
  shopLink,
  shopButtonText,
}) => {
  if (!isLoading && !error && cartItems.length > 0) {
    return null;
  }

  return (
    <div className="col-span-12">
      <div className="rounded-lg p-4 min-h-[200px] flex items-center justify-center">
        {isLoading ? (
          <LoadingSpinner loadingMessage={loadingMessage} />
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4">
            {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6">
            <HiOutlineShoppingCart className="h-16 w-16 text-gray-300" />
            <p className="text-lg font-medium text-gray-800">{emptyMessage}</p>
            <p className="text-center text-sm text-gray-500">می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
            <Link href={shopLink ?? '/'}>
              <PrimaryButton>{shopButtonText}</PrimaryButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartStatus;
