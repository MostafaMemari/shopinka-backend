import { OrderItemType, Prisma } from '@prisma/client';
import { CartItemWithRelations } from 'src/common/types/prisma-types';

export function mapCartItemsToOrderItems(cartItems: CartItemWithRelations[]): Prisma.OrderItemCreateWithoutOrderInput[] {
  return cartItems.map((item) => {
    const base = item.product ?? item.productVariant;

    const productName = item.product?.name || item.productVariant?.product?.name || item.customSticker?.name || '';

    const productImage =
      item.product?.mainImage?.fileUrl ||
      item.productVariant?.product?.mainImage?.fileUrl ||
      item.customSticker?.previewImage?.fileUrl ||
      '';

    const basePriceValue = base?.basePrice || 0;
    const unitPriceValue = base?.salePrice || basePriceValue;
    const totalValue = unitPriceValue * item.quantity;

    const itemType: OrderItemType = item.customSticker
      ? OrderItemType.CUSTOM_STICKER
      : item.productVariant
        ? OrderItemType.PRODUCT_VARIANT
        : OrderItemType.PRODUCT;

    const variantSnapshot = item.productVariant ? item.productVariant.attributeValues : null;
    const customStickerSnapshot = item.customSticker ? item.customSticker : null;

    return {
      productId: item.productId,
      productVariantId: item.productVariantId,
      customStickerId: item.customStickerId,
      itemType,
      quantity: item.quantity,
      productTitle: productName,
      imageUrl: productImage,
      basePrice: item.customSticker ? item.customSticker.finalPrice : basePriceValue,
      unitPrice: item.customSticker ? item.customSticker.finalPrice : unitPriceValue,
      total: item.customSticker ? item.customSticker.finalPrice * item.quantity : totalValue,
      variantSnapshot,
      customStickerSnapshot,
    };
  });
}
