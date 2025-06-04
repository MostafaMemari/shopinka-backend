import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { createCartBulk, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/Modules/cart/services/cart.api';
import { CartData, CartItem, CartItemState, CartResponse } from '@/Modules/cart/types/cartType';

interface CartState {
  items: CartItemState[];
  totalPrice: number;
  totalDiscountPrice: number;
  totalDiscount: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalDiscount: 0,
};

const calculateTotals = (items: CartItemState[]): Pick<CartState, 'totalPrice' | 'totalDiscountPrice' | 'totalDiscount'> => {
  const validItems = Array.isArray(items) ? items : [];
  return {
    totalPrice: validItems.reduce((total, item) => total + item.basePrice * item.count, 0),
    totalDiscountPrice: validItems.reduce((total, item) => total + item.salePrice * item.count, 0),
    totalDiscount: validItems.reduce((total, item) => total + (item.basePrice - item.salePrice) * item.count, 0), // اصلاح محاسبه تخفیف
  };
};

export const mapCartResponseToCartItemState = (cart: CartResponse): CartItemState[] => {
  return (
    cart.items?.map((item: CartItem) => {
      const productId = item.product?.id ?? item.productVariant?.id ?? 0;
      const type = item.product?.type === 'SIMPLE' ? 'SIMPLE' : 'VARIABLE';
      const productTitle = item.product?.name ?? item.productVariant?.product?.name ?? '';
      const productThumbnail = item.product?.mainImage?.fileUrl ?? item.productVariant?.product?.mainImage?.fileUrl ?? '';

      const basePrice = item.product?.basePrice ?? item.productVariant?.basePrice ?? 0;
      const salePrice = item.product?.salePrice ?? item.productVariant?.salePrice ?? 0;
      const discount = Math.round(((basePrice - salePrice) / basePrice) * 100) || 0; // درصد تخفیف

      const attributeValues = item.productVariant?.attributeValues ?? [];

      return {
        id: productId,
        count: item.quantity,
        type,
        title: productTitle,
        thumbnail: productThumbnail,
        basePrice,
        salePrice,
        discount,
        attributeValues,
      };
    }) || []
  );
};

// Thunk برای همگام‌سازی سبد خرید موقع لاگین
export const syncCartWithApi = createAsyncThunk('cart/syncCartWithApi', async (_, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) return;

  const cartDataLS = localStorage.getItem('cart');
  if (!cartDataLS) {
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
    return;
  }

  try {
    const cartItems = JSON.parse(cartDataLS) as CartItemState[];
    if (cartItems.length === 0) {
      localStorage.removeItem('cart');
      const updatedCart = await getCart();
      const items = mapCartResponseToCartItemState(updatedCart);
      dispatch(setCart({ items }));
      return;
    }

    const itemsPayload: CartData[] = cartItems.map((item) => ({
      quantity: item.count,
      productId: item.type === 'SIMPLE' ? (item.id ? Number(item.id) : undefined) : undefined,
      productVariantId: item.type === 'VARIABLE' ? (item.id ? Number(item.id) : undefined) : undefined,
    }));

    await createCartBulk({ items: itemsPayload });
    localStorage.removeItem('cart');
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to sync cart with API:', error);
    throw error;
  }
});

// Thunk برای اضافه کردن آیتم به سبد خرید
export const addToCart = createAsyncThunk('cart/addToCart', async (item: CartItemState, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) {
    const cartDataLS = localStorage.getItem('cart');
    const cartItems: CartItemState[] = cartDataLS ? JSON.parse(cartDataLS) : [];
    const existingItem = cartItems.find((i) => i.id === item.id);
    let updatedCart: CartItemState[];

    if (existingItem) {
      updatedCart = cartItems.map((i) => (i.id === item.id ? { ...i, count: i.count + item.count } : i));
    } else {
      updatedCart = [...cartItems, item];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(setCart({ items: updatedCart }));
    return;
  }

  try {
    const payload: CartData = {
      quantity: item.count,
      productId: item.type === 'SIMPLE' ? (item.id ? Number(item.id) : undefined) : undefined,
      productVariantId: item.type === 'VARIABLE' ? (item.id ? Number(item.id) : undefined) : undefined,
    };
    await createCartBulk({ items: [payload] });
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
});

// Thunk برای افزایش تعداد آیتم
export const increaseCount = createAsyncThunk('cart/increaseCount', async (item: CartItemState, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) {
    const cartDataLS = localStorage.getItem('cart');
    const cartItems: CartItemState[] = cartDataLS ? JSON.parse(cartDataLS) : [];
    const updatedCart = cartItems.map((i) => (i.id === item.id ? { ...i, count: i.count + 1 } : i));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(setCart({ items: updatedCart }));
    return;
  }

  try {
    await updateQuantityItemCart({ itemId: Number(item.id), quantity: item.count + 1 });
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to increase cart item count:', error);
    throw error;
  }
});

// Thunk برای کاهش تعداد آیتم
export const decreaseCount = createAsyncThunk('cart/decreaseCount', async (item: CartItemState, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) {
    const cartDataLS = localStorage.getItem('cart');
    const cartItems: CartItemState[] = cartDataLS ? JSON.parse(cartDataLS) : [];
    const updatedCart = cartItems.map((i) => (i.id === item.id && i.count > 1 ? { ...i, count: i.count - 1 } : i));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    dispatch(setCart({ items: updatedCart }));
    return;
  }

  try {
    await updateQuantityItemCart({ itemId: Number(item.id), quantity: item.count - 1 });
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to decrease cart item count:', error);
    throw error;
  }
});

// Thunk برای حذف آیتم از سبد خرید
export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (itemId: string, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) {
    const cartDataLS = localStorage.getItem('cart');
    let cartItems: CartItemState[] = cartDataLS ? JSON.parse(cartDataLS) : [];
    cartItems = cartItems.filter((item) => item.id !== Number(itemId));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    dispatch(setCart({ items: cartItems }));
    return;
  }

  try {
    await removeItemCart(Number(itemId));
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    throw error;
  }
});

// Thunk برای پاک کردن سبد خرید
export const clearCartAction = createAsyncThunk('cart/clearCart', async (_, { getState, dispatch }) => {
  const state = getState() as RootState;
  const { isLogin } = state.auth;

  if (!isLogin) {
    localStorage.removeItem('cart');
    dispatch(setCart({ items: [] }));
    return;
  }

  try {
    await clearCart();
    const updatedCart = await getCart();
    const items = mapCartResponseToCartItemState(updatedCart);
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
});

// تعریف cartSlice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<{ items: CartItemState[] }>) {
      state.items = action.payload.items;
      const totals = calculateTotals(action.payload.items);
      state.totalPrice = totals.totalPrice;
      state.totalDiscountPrice = totals.totalDiscountPrice;
      state.totalDiscount = totals.totalDiscount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/loginSuccess', (state) => {
        // به جای ریست کردن، منتظر همگام‌سازی با API می‌مانیم
        state.items = [];
        state.totalPrice = 0;
        state.totalDiscountPrice = 0;
        state.totalDiscount = 0;
      })
      .addCase('auth/logout/fulfilled', (state) => {
        const cartDataLS = localStorage.getItem('cart');
        const items = cartDataLS ? JSON.parse(cartDataLS) : [];
        state.items = items;
        const totals = calculateTotals(items);
        state.totalPrice = totals.totalPrice;
        state.totalDiscountPrice = totals.totalDiscountPrice;
        state.totalDiscount = totals.totalDiscount;
      });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
