// 'use client';

// import React, { createContext, useContext, useMemo } from 'react';
// import { transformVariants } from './VariantSelector';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import { productVariant } from '@/Modules/product/types/productType';
// import { attribute } from '@/shared/types/attributeType';
// import {
//   setSelectedColor,
//   setSelectedButton,
//   setSelectedVariant,
//   setVariants,
//   setAttributes,
//   setSelectedImage,
//   resetVariantState,
// } from '@/store/slices/variantSlice';

// interface VariantContextType {
//   selectedVariant: productVariant | undefined;
//   selectedColor: string | null;
//   selectedButton: string | null;
//   setSelectedColor: (id: string | null) => void;
//   setSelectedButton: (slug: string | null) => void;
// }

// const VariantContext = createContext<VariantContextType | undefined>(undefined);

// export const useVariant = () => {
//   const context = useContext(VariantContext);
//   if (!context) {
//     throw new Error('useVariant must be used within a VariantProvider');
//   }
//   return context;
// };

// interface VariantProviderProps {
//   children: React.ReactNode;
//   variants: productVariant[];
//   attributes: attribute[];
//   defaultImage?: string | null;
//   defaultVariantId?: number | null;
// }

// export function VariantProvider({ children, variants, attributes, defaultImage, defaultVariantId }: VariantProviderProps) {
//   const dispatch = useDispatch();
//   const { selectedColor, selectedButton, selectedVariant } = useSelector((state: RootState) => state.variant);
//   const isVariableProduct = variants.length > 0;

//   // Reset state when variants change
//   React.useEffect(() => {
//     dispatch(resetVariantState());
//   }, [variants[0]?.productId, dispatch]);

//   // Initialize variants and attributes in Redux
//   React.useEffect(() => {
//     dispatch(setVariants(variants));
//     dispatch(setAttributes(attributes));

//     // Set default variant if exists
//     if (defaultVariantId && isVariableProduct) {
//       const defaultVariant = variants.find((v) => v.id === defaultVariantId);
//       if (defaultVariant) {
//         dispatch(setSelectedVariant(defaultVariant));

//         const colorAttr = defaultVariant.attributeValues.find((attr) => attr.attributeId === 1);
//         const buttonAttr = defaultVariant.attributeValues.find((attr) => attr.attributeId === 6);

//         if (colorAttr) {
//           dispatch(setSelectedColor(colorAttr.id.toString()));
//         }
//         if (buttonAttr) {
//           dispatch(setSelectedButton(buttonAttr.slug));
//         }

//         if (defaultVariant.mainImage?.fileUrl) {
//           dispatch(setSelectedImage(defaultVariant.mainImage.fileUrl));
//         }
//       }
//     } else if (!isVariableProduct && defaultImage) {
//       dispatch(setSelectedImage(defaultImage));
//     }
//   }, [variants, attributes, dispatch, isVariableProduct, defaultImage, defaultVariantId]);

//   const transformedVariants = useMemo(() => transformVariants(variants, attributes), [variants, attributes]);

//   // Handle variant selection and image updates
//   const updateVariantAndImage = React.useCallback(
//     (variant: productVariant | undefined) => {
//       if (variant) {
//         dispatch(setSelectedVariant(variant));
//         if (variant.mainImage?.fileUrl) {
//           dispatch(setSelectedImage(variant.mainImage.fileUrl));
//         }
//       } else {
//         dispatch(setSelectedVariant(undefined));
//         if (!isVariableProduct && defaultImage) {
//           dispatch(setSelectedImage(defaultImage));
//         } else {
//           dispatch(setSelectedImage(null));
//         }
//       }
//     },
//     [dispatch, isVariableProduct, defaultImage],
//   );

//   // Update selected variant and image when selections change
//   React.useEffect(() => {
//     if (!isVariableProduct) {
//       updateVariantAndImage(undefined);
//       return;
//     }

//     if (!selectedColor && !selectedButton) {
//       updateVariantAndImage(undefined);
//       return;
//     }

//     const variant = variants.find((variant) => {
//       // Get the attribute IDs for the current variant
//       const variantAttributeIds = variant.attributeValues.map((attr) => attr.id.toString());

//       // Create a set of selected attribute IDs
//       const selectedAttributeIds = [];
//       if (selectedColor) selectedAttributeIds.push(selectedColor);
//       if (selectedButton) {
//         const buttonAttr = variant.attributeValues.find((attr) => attr.slug === selectedButton && attr.attributeId === 6);
//         if (buttonAttr) selectedAttributeIds.push(buttonAttr.id.toString());
//       }

//       // Check if the selected attribute IDs exactly match the variant's attribute IDs
//       return (
//         selectedAttributeIds.length === variantAttributeIds.length && selectedAttributeIds.every((id) => variantAttributeIds.includes(id))
//       );
//     });

//     updateVariantAndImage(variant);
//   }, [selectedColor, selectedButton, variants, updateVariantAndImage, isVariableProduct]);

//   const handleColorChange = (id: string | null) => {
//     if (selectedColor === id) {
//       dispatch(setSelectedColor(null));
//       updateVariantAndImage(undefined);
//     } else {
//       dispatch(setSelectedColor(id));
//     }
//   };

//   const handleButtonChange = (slug: string | null) => {
//     if (selectedButton === slug) {
//       dispatch(setSelectedButton(null));
//       updateVariantAndImage(undefined);
//     } else {
//       dispatch(setSelectedButton(slug));
//     }
//   };

//   return (
//     <VariantContext.Provider
//       value={{ selectedVariant, selectedColor, selectedButton, setSelectedColor: handleColorChange, setSelectedButton: handleButtonChange }}
//     >
//       {children}
//     </VariantContext.Provider>
//   );
// }
