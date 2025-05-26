import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productVariant } from '@/Modules/product/types/productType';
import { attribute } from '@/shared/types/attributeType';

interface VariantState {
  variants: productVariant[];
  attributes: attribute[];
  selectedVariant: productVariant | undefined;
  selectedColor: string | null;
  selectedButton: string | null;
  selectedImage: string | null;
}

const initialState: VariantState = {
  variants: [],
  attributes: [],
  selectedVariant: undefined,
  selectedColor: null,
  selectedButton: null,
  selectedImage: null,
};

const variantSlice = createSlice({
  name: 'variant',
  initialState,
  reducers: {
    setVariants: (state, action: PayloadAction<productVariant[]>) => {
      state.variants = action.payload;
    },
    setAttributes: (state, action: PayloadAction<attribute[]>) => {
      state.attributes = action.payload;
    },
    setSelectedVariant: (state, action: PayloadAction<productVariant | undefined>) => {
      state.selectedVariant = action.payload;
    },
    setSelectedColor: (state, action: PayloadAction<string | null>) => {
      state.selectedColor = action.payload;
    },
    setSelectedButton: (state, action: PayloadAction<string | null>) => {
      state.selectedButton = action.payload;
    },
    setSelectedImage: (state, action: PayloadAction<string | null>) => {
      state.selectedImage = action.payload;
    },
  },
});

export const { setVariants, setAttributes, setSelectedVariant, setSelectedColor, setSelectedButton, setSelectedImage } =
  variantSlice.actions;

export default variantSlice.reducer;
