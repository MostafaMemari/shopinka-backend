import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { BiStore } from 'react-icons/bi';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import PrimaryButton from '@/shared/components/PrimaryButton';

interface CartItem {
  id: string | number;
}

// تعریف تایپ برای props
interface CartStatusProps {
  isLoading: boolean;
  error: Error | null;
  cartItems: CartItem[];
}

const CartStatus: React.FC<CartStatusProps> = ({ isLoading, error, cartItems }) => {
  if (!isLoading && !error && cartItems.length > 0) {
    return null;
  }

  return (
    <div className="col-span-12">
      <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <FaSpinner className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm text-text/60">در حال بارگذاری سبد خرید...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-sm text-red-500">خطا در بارگذاری سبد خرید</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6">
            <HiOutlineShoppingCart className="h-16 w-16 text-text/30" />
            <p className="text-lg text-text/80 font-medium">سبد خرید شما خالی است!</p>
            <p className="text-sm text-text/60 text-center">می‌توانید برای مشاهده محصولات بیشتر به صفحات زیر بروید:</p>
            <a href="/shop">
              <PrimaryButton className="flex items-center gap-2">
                <BiStore className="h-5 w-5" />
                <span>رفتن به فروشگاه</span>
              </PrimaryButton>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartStatus;
