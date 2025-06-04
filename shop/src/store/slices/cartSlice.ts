// import { createCart } from '@/Modules/cart/services/cart.api';
// import { CartData, CartItemState } from '@/Modules/cart/types/cartType';
// import { shopApiFetch } from '@/server/api';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface CartState {
//   cart: CartItemState[];
//   totalPrice: number;
//   totalDiscountPrice: number;
//   totalDiscount: number;
// }

// const initialState: CartState = {
//   cart: [],
//   totalPrice: 0,
//   totalDiscountPrice: 0,
//   totalDiscount: 0,
// };

// const loadCartFromLocalStorage = (): CartItemState[] => {
//   if (typeof window !== 'undefined') {
//     const storedCart = localStorage.getItem('cart');
//     return storedCart ? JSON.parse(storedCart) : [];
//   }
//   return [];
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     loadCart(state) {
//       state.cart = loadCartFromLocalStorage();
//       state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
//       state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
//       state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
//     },
//     setCart(state, action: PayloadAction<CartItemState[]>) {
//       state.cart = action.payload;
//       localStorage.setItem('cart', JSON.stringify(action.payload));
//       state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.count, 0);
//       state.totalDiscountPrice = action.payload.reduce((total, item) => total + item.discount_price * item.count, 0);
//       state.totalDiscount = action.payload.reduce((total, item) => total + item.discount, 0);
//     },
//     decreaseCount(state, action: PayloadAction<CartItemState>) {
//       state.cart = state.cart.map((item) => (item.id === action.payload.id && item.count > 1 ? { ...item, count: item.count - 1 } : item));
//       localStorage.setItem('cart', JSON.stringify(state.cart));
//       state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
//       state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
//       state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
//     },
//     increaseCount(state, action: PayloadAction<CartItemState>) {
//       state.cart = state.cart.map((item) => (item.id === action.payload.id ? { ...item, count: item.count + 1 } : item));
//       localStorage.setItem('cart', JSON.stringify(state.cart));
//       state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
//       state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
//       state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
//     },
//     deleteFromCart(state, action: PayloadAction<string>) {
//       state.cart = state.cart.filter((item) => item.id !== Number(action.payload));
//       localStorage.setItem('cart', JSON.stringify(state.cart));
//       state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
//       state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
//       state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
//     },
//     clearCart(state) {
//       state.cart = [];
//       localStorage.removeItem('cart');
//       state.totalPrice = 0;
//       state.totalDiscountPrice = 0;
//       state.totalDiscount = 0;
//     },
//   },
// });

// export const syncCartWithApi = async (): Promise<void> => {
//   if (typeof window !== 'undefined') {
//     const cartData = localStorage.getItem('cart');
//     if (cartData) {
//       try {
//         const cartItems = JSON.parse(cartData) as CartItemState[];
//         if (cartItems.length > 0) {
//           for (const item of cartItems) {
//             const cartDataPayload: CartData = {
//               quantity: item.count,
//               productId: item.type === 'SIMPLE' ? item.id : null,
//               productVariantId: item.type === 'VARIABLE' ? item.id : null,
//             };
//             await createCart({ cartData: cartDataPayload });
//           }
//           localStorage.removeItem('cart');
//         }
//       } catch (error) {
//         console.error('Failed to sync cart with API:', error);
//       }
//     }
//   }
// };
// export const { loadCart, setCart, decreaseCount, increaseCount, deleteFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItemState, CartResponse, CartData } from '@/Modules/cart/types/cartType';
import { RootState } from '@/store';
import { createCart, getCart } from '@/Modules/cart/services/cart.api';

interface CartState {
  cart: CartItemState[];
  totalPrice: number;
  totalDiscountPrice: number;
  totalDiscount: number;
  isSyncedWithApi: boolean;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalDiscount: 0,
  isSyncedWithApi: false,
};

const loadCartFromLocalStorage = (): CartItemState[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

// تابع کمکی برای محاسبه توتال‌ها
const calculateTotals = (cart: CartItemState[]): Pick<CartState, 'totalPrice' | 'totalDiscountPrice' | 'totalDiscount'> => {
  return {
    totalPrice: cart.reduce((total, item) => total + item.basePrice * item.count, 0),
    totalDiscountPrice: cart.reduce((total, item) => total + item.salePrice * item.count, 0),
    totalDiscount: cart.reduce((total, item) => total + item.discount, 0),
  };
};

export const mapCartResponseToCartItemState = (cartResponse: CartResponse): CartItemState[] => {
  return cartResponse.cartItems.map((item) => {
    const basePrice = item.product?.basePrice ?? item.productVariant?.basePrice ?? 0;
    const salePrice = item.product?.salePrice ?? item.productVariant?.salePrice ?? 0;

    const discount = basePrice > 0 && salePrice > 0 && salePrice < basePrice ? basePrice - salePrice : 0;

    return {
      id: item.id,
      type: item.productId ? 'SIMPLE' : 'VARIABLE',
      title: item.product?.name || 'Unknown Product',
      thumbnail: item.product?.mainImage?.fileUrl || '',
      basePrice,
      salePrice,
      discount,
      count: item.quantity,
      attributeValues: item.productVariant?.attributeValues || [],
    };
  });
};
export const syncCartWithApi = createAsyncThunk('cart/syncCartWithApi', async (_, { getState, dispatch }) => {
  const state = getState() as RootState;

  const { isLogin } = state.auth;

  if (!isLogin) return;

  const cartData = localStorage.getItem('cart');
  if (cartData) {
    try {
      const cartItems = JSON.parse(cartData) as CartItemState[];
      if (cartItems.length > 0) {
        for (const item of cartItems) {
          const cartDataPayload: CartData = {
            quantity: item.count,
            productId: item.type === 'SIMPLE' ? item.id : null,
            productVariantId: item.type === 'VARIABLE' ? item.id : null,
          };
          await createCart({ cartData: cartDataPayload });
        }
        localStorage.removeItem('cart');
        dispatch(setIsSyncedWithApi(true));
        const updatedCart = await getCart();
        dispatch(setCart(mapCartResponseToCartItemState(updatedCart)));
      }
    } catch (error) {
      console.error('Failed to sync cart with API:', error);
      throw error;
    }
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state) {
      if (!state.isSyncedWithApi) {
        state.cart = loadCartFromLocalStorage();
        Object.assign(state, calculateTotals(state.cart));
      }
    },
    setCart(state, action: PayloadAction<CartItemState[]>) {
      state.cart = action.payload;
      if (!state.isSyncedWithApi) {
        localStorage.setItem('cart', JSON.stringify(action.payload));
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    addToCart(state, action: PayloadAction<CartItemState>) {
      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      if (existingItem) {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, count: item.count + action.payload.count } : item,
        );
      } else {
        state.cart.push(action.payload);
      }
      if (!state.isSyncedWithApi) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    decreaseCount(state, action: PayloadAction<CartItemState>) {
      state.cart = state.cart.map((item) => (item.id === action.payload.id && item.count > 1 ? { ...item, count: item.count - 1 } : item));
      if (!state.isSyncedWithApi) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    increaseCount(state, action: PayloadAction<CartItemState>) {
      state.cart = state.cart.map((item) => (item.id === action.payload.id ? { ...item, count: item.count + 1 } : item));
      if (!state.isSyncedWithApi) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.id !== Number(action.payload));
      if (!state.isSyncedWithApi) {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    clearCart(state) {
      state.cart = [];
      if (!state.isSyncedWithApi) {
        localStorage.removeItem('cart');
      }
      Object.assign(state, calculateTotals(state.cart));
    },
    setIsSyncedWithApi(state, action: PayloadAction<boolean>) {
      state.isSyncedWithApi = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncCartWithApi.fulfilled, (state) => {
      state.isSyncedWithApi = true;
    });
  },
});

export const { loadCart, setCart, addToCart, decreaseCount, increaseCount, deleteFromCart, clearCart, setIsSyncedWithApi } =
  cartSlice.actions;
export default cartSlice.reducer;
