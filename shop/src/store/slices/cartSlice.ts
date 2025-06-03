import { CreateCartFromLocalStorage } from '@/Modules/cart/services/cart.api';
import { CartData, CartItemState } from '@/Modules/cart/types/cartType';
import { shopApiFetch } from '@/server/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: CartItemState[];
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

const loadCartFromLocalStorage = (): CartItemState[] => {
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
    setCart(state, action: PayloadAction<CartItemState[]>) {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(action.payload));
      state.totalPrice = action.payload.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = action.payload.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = action.payload.reduce((total, item) => total + item.discount, 0);
    },
    decreaseCount(state, action: PayloadAction<CartItemState>) {
      state.cart = state.cart.map((item) => (item.id === action.payload.id && item.count > 1 ? { ...item, count: item.count - 1 } : item));
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    increaseCount(state, action: PayloadAction<CartItemState>) {
      state.cart = state.cart.map((item) => (item.id === action.payload.id ? { ...item, count: item.count + 1 } : item));
      localStorage.setItem('cart', JSON.stringify(state.cart));
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.count, 0);
      state.totalDiscountPrice = state.cart.reduce((total, item) => total + item.discount_price * item.count, 0);
      state.totalDiscount = state.cart.reduce((total, item) => total + item.discount, 0);
    },
    deleteFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.id !== Number(action.payload));
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

export const syncCartWithApi = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
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
            await CreateCartFromLocalStorage({ cartData: cartDataPayload });
          }
          localStorage.removeItem('cart');
        }
      } catch (error) {
        console.error('Failed to sync cart with API:', error);
      }
    }
  }
};
export const { loadCart, setCart, decreaseCount, increaseCount, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
