// src/features/product/productSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductDetails, ProductVariant } from '@/Modules/product/types/productType';

interface ProductState {
  product: ProductDetails | null;
  selectedColor: string | null;
  selectedButton: string | null;
  selectedVariant: ProductVariant | null;
}

const initialState: ProductState = {
  product: null,
  selectedColor: null,
  selectedButton: null,
  selectedVariant: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<ProductDetails>) {
      state.product = action.payload;
      state.selectedColor = null;
      state.selectedButton = null;
      state.selectedVariant = null;
      if (action.payload.type === 'VARIABLE' && action.payload.defaultVariantId) {
        const defaultVariant = action.payload.variants.find((v) => v.id === action.payload.defaultVariantId);
        if (defaultVariant) {
          state.selectedVariant = defaultVariant;
          const colorAttr = defaultVariant.attributeValues.find((attr) => attr.attributeId === 1);
          const buttonAttr = defaultVariant.attributeValues.find((attr) => attr.attributeId === 6);
          state.selectedColor = colorAttr ? colorAttr.id.toString() : null;
          state.selectedButton = buttonAttr ? buttonAttr.slug : null;
        }
      }
    },
    clearProduct(state) {
      state.product = null;
      state.selectedColor = null;
      state.selectedButton = null;
      state.selectedVariant = null;
    },
    setSelectedColor(state, action: PayloadAction<string | null>) {
      state.selectedColor = action.payload;
      if (!action.payload) state.selectedButton = null;
    },
    setSelectedButton(state, action: PayloadAction<string | null>) {
      state.selectedButton = action.payload;
    },
    setSelectedVariant(state, action: PayloadAction<ProductVariant | null>) {
      state.selectedVariant = action.payload;
    },
  },
});

export const { setProduct, clearProduct, setSelectedColor, setSelectedButton, setSelectedVariant } = productSlice.actions;
export default productSlice.reducer;
