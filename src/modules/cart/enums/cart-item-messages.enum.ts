export enum CartItemMessages {
  AlreadyExistsCartItem = 'CartItem with this productId or productVariantId already exists.',
  NotFoundCartItem = 'CartItem not found',
  RemovedCartItemSuccess = 'CartItem removed successfully',
  CreatedCartItemSuccess = 'CartItem created successfully',
  UpdatedCartItemSuccess = 'CartItem Updated successfully.',
  ProductNotAvailable = 'The requested product is not available in the desired quantity.',
  ProductVariantNotAvailable = 'The requested product variant is not available in the desired quantity.',
  OneFailedAllowed = 'One filed product or productVariant allowed.',
  ReplacedCartItemsSuccess = 'Cart items replaced successfully',
  NotFoundCustomSticker = 'Custom sticker not found.',
}
