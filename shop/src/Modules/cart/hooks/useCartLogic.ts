'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CartItemState } from '@/Modules/cart/types/cartType';
import { useCart } from './useCart';
import { ProductCardLogic } from '../types/productCardLogic';

export interface ProductCardLogicProps {
  product: ProductCardLogic;
}

export const useCartLogic = ({ product }: ProductCardLogicProps) => {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const { cart, addToCart } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItemState | undefined>();

  const isVariableProduct = product.type === 'VARIABLE';

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product.salePrice), [selectedVariant]);
  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product.basePrice), [selectedVariant]);
  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  const cartItemId = useMemo(() => {
    return isVariableProduct ? selectedVariant?.id : product.id;
  }, [isVariableProduct, selectedVariant?.id, product.id]);

  useEffect(() => {
    const found = cart.find((item) => item.id === cartItemId);
    // فقط اگر ID محصول یا تعداد آن تغییر کرده باشد، state را به‌روزرسانی کن
    if (found?.id !== existingProduct?.id || found?.count !== existingProduct?.count) {
      setExistingProduct(found);
    }
  }, [cart, cartItemId]); // فقط به cart و cartItemId وابسته است

  const isVariantSelected = !!selectedVariant;
  const isInCart = !!existingProduct;

  const addToCartHandler = () => {
    if (existingProduct) {
      addToCart({ ...existingProduct, count: existingProduct.count + 1 });
    } else {
      const cartItem: CartItemState = {
        id: isVariableProduct ? (selectedVariant?.id ?? product.id) : product.id,
        title: product.name,
        thumbnail: product.mainImageUrl ?? '',
        basePrice: oldPrice ?? newPrice ?? 0,
        salePrice: newPrice ?? 0,
        discount: discount ?? 0,
        count: 1,
        type: product.type,
        attributeValues: selectedVariant?.attributeValues ?? [],
      };
      addToCart(cartItem);
    }
  };

  return {
    product,
    newPrice,
    isVariableProduct,
    isVariantSelected,
    isInCart,
    existingProduct,
    addToCart: addToCartHandler,
  };
};
