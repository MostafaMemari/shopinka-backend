// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { CartItemState } from '../types/cartType';
// import { useCart } from './useCart';
// import { ProductCardLogic } from '../types/productCardLogic';

// export interface ProductCardLogicProps {
//   product: ProductCardLogic;
// }

// export const useCartLogic = ({ product }: ProductCardLogicProps) => {
//   const { selectedVariant } = useSelector((state: RootState) => state.product);
//   const { cart, setCart, increaseCount } = useCart();
//   const [existingProduct, setExistingProduct] = useState<CartItemState | undefined>();

//   const isVariableProduct = product.type === 'VARIABLE';

//   const newPrice = useMemo(() => (selectedVariant ? selectedVariant.salePrice : product.salePrice), [selectedVariant]);
//   const oldPrice = useMemo(() => (selectedVariant ? selectedVariant.basePrice : product.basePrice), [selectedVariant]);
//   const discount = useMemo(() => {
//     if (newPrice && oldPrice) {
//       return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
//     }
//     return 0;
//   }, [newPrice, oldPrice]);

//   useEffect(() => {
//     const cartItemId = isVariableProduct ? selectedVariant?.id : product.id;

//     const found = cart.find((item) => item.id === cartItemId);

//     setExistingProduct(found);
//   }, [cart, selectedVariant]);

//   const isVariantSelected = !!selectedVariant;
//   const isInCart = !!existingProduct;

//   const addToCart = () => {
//     if (existingProduct) {
//       increaseCount(existingProduct);
//     } else {
//       const cartItem: CartItemState = {
//         id: isVariableProduct ? (selectedVariant?.id ?? product.id) : product.id,
//         title: product.name,
//         thumbnail: product.mainImageUrl ?? '',
//         salePrice: newPrice ?? 0,
//         basePrice: oldPrice ?? newPrice ?? 0,
//         discount: discount ?? 0,
//         count: 1,
//         type: product.type,
//         attributeValues: selectedVariant?.attributeValues ?? [],
//       };

//       setCart([...cart, cartItem]);
//     }
//   };
//   return {
//     product,
//     newPrice,
//     isVariableProduct,
//     isVariantSelected,
//     isInCart,
//     existingProduct,
//     addToCart,
//   };
// };

// src/hooks/useCartLogic.ts
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

  useEffect(() => {
    const cartItemId = isVariableProduct ? selectedVariant?.id : product.id;
    const found = cart.find((item) => item.id === cartItemId);
    setExistingProduct(found);
  }, [cart, selectedVariant, isVariableProduct, product.id]);

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
        basePrice: oldPrice ?? newPrice ?? 0, // استفاده از basePrice به عنوان price
        salePrice: newPrice ?? 0, // استفاده از salePrice به عنوان discount_price
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
