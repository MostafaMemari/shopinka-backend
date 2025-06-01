'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { CartItem } from '../types/cartType';
import { useCart } from './useCart';
import { ProductDetails } from '@/Modules/product/types/productType';

export const useCartLogic = (propProduct?: ProductDetails) => {
  const { product: stateProduct, selectedVariant } = useSelector((state: RootState) => state.product);
  const product = propProduct || stateProduct;
  const { cart, setCart, increaseCount } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItem | undefined>();

  const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product?.salePrice), [selectedVariant, product]);
  const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product?.basePrice), [selectedVariant, product]);
  const discount = useMemo(() => {
    if (newPrice && oldPrice) {
      return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
    }
    return 0;
  }, [newPrice, oldPrice]);

  useEffect(() => {
    if (!product) return;

    const cartItemId = product.type === 'VARIABLE' ? (selectedVariant?.id ?? product.id) : product.id;
    const found = cart.find((item) => item.id === cartItemId);
    setExistingProduct(found);
  }, [cart, product, selectedVariant]);

  const isVariableProduct = product?.type === 'VARIABLE';
  const isVariantSelected = !!selectedVariant;
  const isInCart = !!existingProduct;

  const addToCart = () => {
    if (existingProduct) {
      increaseCount(existingProduct);
    } else if (product && newPrice) {
      const cartItem: CartItem = {
        id: product.type === 'VARIABLE' ? (selectedVariant?.id ?? product.id) : product.id,
        title: product.name,
        thumbnail: product.mainImage?.fileUrl ?? '',
        price: newPrice,
        discount_price: oldPrice ?? newPrice,
        discount: discount ?? 0,
        count: 1,
        type: product.type,
        attributeValues: selectedVariant?.attributeValues ?? [],
      };

      setCart([...cart, cartItem]);
    }
  };

  return {
    product,
    newPrice,
    isVariableProduct,
    isVariantSelected,
    isInCart,
    existingProduct,
    addToCart,
  };
};
