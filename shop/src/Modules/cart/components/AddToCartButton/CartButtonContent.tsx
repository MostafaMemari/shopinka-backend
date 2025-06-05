import { cn } from '@/shared/utils/utils';
import Link from 'next/link';
import CartControls from '../CartControls';
import { CartItemState } from '../../types/cartType';
import { PulseLoader } from 'react-spinners';
import PrimaryButton from '@/shared/components/PrimaryButton';

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
        <>
          <PrimaryButton
            type="submit"
            onClick={addToCart}
            aria-label={isVariableProduct && !isVariantSelected ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
            isLoading={isAddingToCart}
            disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
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
          </PrimaryButton>
        </>
      )}
    </>
  );
};
