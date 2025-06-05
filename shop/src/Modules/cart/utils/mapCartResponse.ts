import { CartItem, CartItemState } from '../types/cartType';

export const mapCartResponseToCartItemState = (cartItems: CartItem[]): CartItemState[] => {
  return (
    cartItems?.map((item: CartItem) => {
      const productId = item.product?.id ?? item.productVariant?.id ?? 0;
      const type = item.product?.type === 'SIMPLE' ? 'SIMPLE' : 'VARIABLE';
      const productTitle = item.product?.name ?? item.productVariant?.product?.name ?? '';
      const productThumbnail = item.product?.mainImage?.fileUrl ?? item.productVariant?.product?.mainImage?.fileUrl ?? '';

      const basePrice = item.product?.basePrice ?? item.productVariant?.basePrice ?? 0;
      const salePrice = item.product?.salePrice ?? item.productVariant?.salePrice ?? 0;
      const discount = Math.round(((basePrice - salePrice) / basePrice) * 100) || 0; // درصد تخفیف

      const attributeValues = item.productVariant?.attributeValues ?? [];

      return {
        itemId: item.id,
        id: productId,
        count: item.quantity,
        type,
        title: productTitle,
        thumbnail: productThumbnail,
        basePrice,
        salePrice,
        discount,
        attributeValues,
      };
    }) || []
  );
};
