// src/components/AddToCartButtonMobile.tsx
'use client';

import PrimaryButton from '@/components/PrimaryButton';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';
import { useCartLogic } from '@/hooks/reactQuery/cart/useCartLogic';
import CartControls from '../CartControls';

interface AddToCartButtonMobileProps {
  product: ProductCardLogic;
}

export default function AddToCartButtonMobile({ product }: AddToCartButtonMobileProps) {
  const { newPrice, isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({
    product,
  });

  // if (!product || !newPrice) return null;

  return (
    <>
      {isInCart ? (
        <div className={'flex items-center gap-4'}>
          {existingProduct && <CartControls product={existingProduct} />}
          <div className="hidden lg:flex flex-col items-start text-sm">
            <span className="text-primary font-medium">در سبد شما</span>
            <Link href="/checkout/cart" className="text-blue-600 hover:underline text-sm font-normal mt-1">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <>
          <PrimaryButton
            type="submit"
            onClick={addToCart}
            isLoading={isAddingToCart}
            disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
          >
            {isAddingToCart ? (
              <div className="flex items-center justify-center gap-2">
                <PulseLoader color="#ffffff" size={6} loading aria-label="در حال بارگذاری" />
              </div>
            ) : isVariableProduct && !isVariantSelected ? (
              'لطفاً یک گزینه انتخاب کنید'
            ) : (
              'افزودن به سبد خرید'
            )}
          </PrimaryButton>
        </>
      )}
    </>
  );
}
