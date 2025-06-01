// src/features/cart/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: any[];
  totalPrice: number;
  totalDiscountPrice: number;
  totalDiscount: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
  totalDiscountPrice: 0,
  totalDiscount: 0,
};

const loadCartFromLocalStorage = (): any[] => {
  if (typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }
  return [];
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCart(state) {
      state.cart = loadCartFromLocalStorage();
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    setCart(state, action: PayloadAction<any[]>) {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
      state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = action.payload.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = action.payload.reduce((total, item) => total + item.discount, 0);
    },
    decreaseCount(state, action: PayloadAction<any>) {
      state.cart = state.cart.map((item) =>
        item._id === action.payload._id && item.count > 1 ? { ...item, count: item.count - 1 } : item,
      );
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    increaseCount(state, action: PayloadAction<any>) {
      state.cart = state.cart.map((item) => (item._id === action.payload._id ? { ...item, count: item.count + 1 } : item));
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    clearCart(state) {
      state.cart = [];
      localStorage.removeItem('cart');
      state.totalPrice = 0;
      state.totalDiscountPrice = 0;
      state.totalDiscount = 0;
    },
  },
});

export const { loadCart, setCart, decreaseCount, increaseCount, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
