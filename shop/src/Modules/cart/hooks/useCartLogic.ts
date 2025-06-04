'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedVariant } from '@/store/slices/productSlice'; // فرض می‌کنم این action وجود دارد
import { CartItemState } from '@/Modules/cart/types/cartType';
import { useCart } from './useCart';
import { ProductCardLogic } from '../types/productCardLogic';

export interface ProductCardLogicProps {
  product: ProductCardLogic;
}

export const useCartLogic = ({ product }: ProductCardLogicProps) => {
  const dispatch = useDispatch();
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const { cart, addToCart } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItemState | undefined>();

  const isVariableProduct = product.type === 'VARIABLE';

  useEffect(() => {
    dispatch(setSelectedVariant(null));
  }, [product.id, dispatch]);

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product.salePrice), [selectedVariant, product.salePrice]);
  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product.basePrice), [selectedVariant, product.basePrice]);
  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  const cartItemId = useMemo(() => {
    return isVariableProduct ? (selectedVariant?.id ?? product.id) : product.id;
  }, [isVariableProduct, selectedVariant, product.id]);

  useEffect(() => {
    const found = cart.find((item) => item.id === cartItemId);
    if (found?.id !== existingProduct?.id || found?.count !== existingProduct?.count) {
      setExistingProduct(found);
    }
  }, [cart, cartItemId, existingProduct]);

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
