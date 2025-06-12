// src/store/slices/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductVariant } from '@/types/productType';

interface ProductState {
  selectedVariant: ProductVariant | null;
  selectedColor: string | null;
  selectedButton: string | null;
}

const initialState: ProductState = {
  selectedVariant: null,
  selectedColor: null,
  selectedButton: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedVariant(state, action: PayloadAction<ProductVariant | null>) {
      state.selectedVariant = action.payload;
    },
    setSelectedColor(state, action: PayloadAction<string | null>) {
      state.selectedColor = action.payload;
    },
    setSelectedButton(state, action: PayloadAction<string | null>) {
      state.selectedButton = action.payload;
    },
  },
});

export const { setSelectedVariant, setSelectedColor, setSelectedButton } = productSlice.actions;
export default productSlice.reducer;
