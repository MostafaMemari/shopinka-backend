import { CartItem, CartItemState } from '@/types/cartType';
import { orderItemMapped, OrderProductItem } from '@/types/orderType';

export const mapCartResponseToCartItemState = (cartItems: CartItem[]): CartItemState[] => {
  return (
    cartItems?.map((item: CartItem) => {
      const productId = item.product?.id ?? item.productVariant?.id ?? 0;
      const type = item.product?.type === 'SIMPLE' ? 'SIMPLE' : 'VARIABLE';
      const productTitle = item.product?.name ?? item.productVariant?.product?.name ?? '';
      const productThumbnail = item.product?.mainImage?.fileUrl ?? item.productVariant?.product?.mainImage?.fileUrl ?? '';
      const productSlug = item.product?.slug ?? '';

      const basePrice = item.product?.basePrice ?? item.productVariant?.basePrice ?? 0;
      const salePrice = item.product?.salePrice ?? item.productVariant?.salePrice ?? 0;
      const discount = Math.round(((basePrice - salePrice) / basePrice) * 100) || 0; // درصد تخفیف

      const attributeValues = item.productVariant?.attributeValues ?? [];

      return {
        itemId: item.id,
        id: productId,
        count: item.quantity,
        slug: productSlug,
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

// export const mappedOrderItem = (orderItem: OrderProductItem): orderItemMapped => {
//   const productId = orderItem.product?.id ?? orderItem.productVariant?.id ?? 0;
//   const type = orderItem.product?.type === 'SIMPLE' ? 'SIMPLE' : 'VARIABLE';
//   const productTitle = orderItem.product?.name ?? orderItem.productVariant?.product?.name ?? '';
//   const productThumbnail = orderItem.product?.mainImage?.fileUrl ?? orderItem.productVariant?.product?.mainImage?.fileUrl ?? '';

//   const basePrice = orderItem.product?.basePrice ?? orderItem.productVariant?.basePrice ?? 0;
//   const salePrice = orderItem.product?.salePrice ?? orderItem.productVariant?.salePrice ?? 0;
//   const discount = Math.round(((basePrice - salePrice) / basePrice) * 100) || 0;

//   const attributeValues = orderItem.productVariant?.attributeValues ?? [];

//   return {
//     itemId: orderItem.id,
//     id: productId,
//     count: orderItem.quantity,
//     type,
//     title: productTitle,
//     thumbnail: productThumbnail,
//     basePrice,
//     salePrice,
//     discount,
//     attributeValues,
//   };
// };
