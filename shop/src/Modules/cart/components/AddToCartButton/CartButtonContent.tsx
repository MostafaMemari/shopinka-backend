import { cn } from '@/shared/utils/utils';
import Link from 'next/link';
import CartControls from '../CartControls';
import { CartItemState } from '../../types/cartType';
import { PulseLoader } from 'react-spinners';

interface CartButtonContentProps {
  isVariableProduct: boolean;
  isVariantSelected: boolean;
  isInCart: boolean;
  existingProduct?: CartItemState;
  addToCart: () => void;
  className?: string;
  isAddingToCart?: boolean;
}

export const CartButtonContent = ({
  isVariableProduct,
  isVariantSelected,
  isInCart,
  existingProduct,
  addToCart,
  className,
  isAddingToCart = false,
}: CartButtonContentProps) => {
  return (
    <>
      {isInCart ? (
        <div className={cn('flex items-center gap-4', className)}>
          {existingProduct && <CartControls product={existingProduct} />}
          <div className="hidden lg:flex flex-col items-start text-sm">
            <span className="text-primary font-medium">در سبد شما</span>
            <Link href="/cart" className="text-blue-600 hover:underline text-sm font-normal mt-1">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <button
          className={cn(
            'flex-1 rounded-lg bg-[hsl(var(--primary))] px-4 py-2 text-white transition-opacity hover:opacity-90 cursor-pointer',
            isVariableProduct && !isVariantSelected && 'cursor-not-allowed opacity-50',
            className,
          )}
          onClick={addToCart}
          disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
          aria-label={isVariableProduct && !isVariantSelected ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center gap-2">
              <PulseLoader color="#ffffff" size={6} loading aria-label="در حال بارگذاری" />
            </div>
          ) : isVariableProduct && !isVariantSelected ? (
            'لطفاً گزینه‌های محصول را انتخاب کنید'
          ) : (
            'افزودن به سبد خرید'
          )}
        </button>
      )}
    </>
  );
};
