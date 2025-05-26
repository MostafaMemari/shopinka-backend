import { configureStore } from '@reduxjs/toolkit';
import variantReducer from './slices/variantSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    variant: variantReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
