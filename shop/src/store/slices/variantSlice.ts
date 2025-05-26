import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productVariant } from '@/Modules/product/types/productType';
import { attribute } from '@/shared/types/attributeType';

interface VariantState {
  selectedVariant: productVariant | undefined;
  selectedColor: string | null;
  selectedButton: string | null;
  variants: productVariant[];
  attributes: attribute[];
  selectedImage: string | null;
}

const initialState: VariantState = {
  selectedVariant: undefined,
  selectedColor: null,
  selectedButton: null,
  variants: [],
  attributes: [],
  selectedImage: null,
};

const variantSlice = createSlice({
  name: 'variant',
  initialState,
  reducers: {
    setSelectedVariant: (state, action: PayloadAction<productVariant | undefined>) => {
      state.selectedVariant = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string | null>) => {
      state.selectedColor = action.payload;
    },
    setSelectedButton: (state, action: PayloadAction<string | null>) => {
      state.selectedButton = action.payload;
    },
    setVariants: (state, action: PayloadAction<productVariant[]>) => {
      state.variants = action.payload;
    },
    setAttributes: (state, action: PayloadAction<attribute[]>) => {
      state.attributes = action.payload;
    },
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    },
    resetVariantState: (state) => {
      state.selectedVariant = undefined;
      state.selectedColor = null;
      state.selectedButton = null;
      state.selectedImage = null;
    },
  },
});

export const { setSelectedVariant, setSelectedColor, setSelectedButton, setVariants, setAttributes, setSelectedImage, resetVariantState } =
  variantSlice.actions;

export default variantSlice.reducer;
