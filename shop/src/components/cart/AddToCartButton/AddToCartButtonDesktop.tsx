'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import { useCartLogic } from '@/hooks/reactQuery/cart/useCartLogic';
import CartControls from '../CartControls';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const { isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({ product });

  return (
    <div className="mb-6 center gap-4">
      {isInCart ? (
        <div className={'flex items-center gap-4'}>
          {existingProduct && (
            <div className="w-1/3">
              <CartControls product={existingProduct} />
            </div>
          )}
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
    </div>
  );
}

export default AddToCartButtonDesktop;
