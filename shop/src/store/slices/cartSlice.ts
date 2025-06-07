import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { createCartBulk, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/modules/cart/services/cart.api';
import { CartData, CartItemState, CartState } from '@/modules/cart/types/cartType';
import { calculateTotals } from '@/modules/cart/utils/calculateTotals';

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalDiscount: 0,
};

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
    const items = updatedCart.items;
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
});

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
    const items = updatedCart.items;
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to increase cart item count:', error);
    throw error;
  }
});

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
    const items = updatedCart.items;
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to decrease cart item count:', error);
    throw error;
  }
});

export const deleteFromCart = createAsyncThunk('cart/deleteFromCart', async (itemId: number, { getState, dispatch }) => {
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
    const items = updatedCart.items;
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    throw error;
  }
});

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
    const items = updatedCart.items;
    dispatch(setCart({ items }));
  } catch (error) {
    console.error('Failed to clear cart:', error);
    throw error;
  }
});

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
