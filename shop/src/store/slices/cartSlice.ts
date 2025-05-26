import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productVariant } from '@/Modules/product/types/productType';

interface CartItem {
  variant: productVariant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.variant.id === action.payload.variant.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.variant.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ variantId: number; quantity: number }>) => {
      const item = state.items.find((item) => item.variant.id === action.payload.variantId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
