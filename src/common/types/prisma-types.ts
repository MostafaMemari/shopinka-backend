import { AttributeValue, CartItem, CustomSticker, Font, GalleryItem, MaterialSticker, Product, ProductVariant } from '@prisma/client';

export type CartItemWithRelations = CartItem & {
  product?: (Product & { mainImage?: GalleryItem | null }) | null;
  productVariant?:
    | (ProductVariant & {
        product?: (Product & { mainImage?: GalleryItem | null }) | null;
        attributeValues: AttributeValue[];
      })
    | null;
  customSticker?:
    | (CustomSticker & {
        previewImage?: GalleryItem | null;
        font?: Font | null;
        material?: MaterialSticker | null;
      })
    | null;
};
