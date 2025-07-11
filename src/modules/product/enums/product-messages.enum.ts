export enum ProductMessages {
  AlreadyExistsProduct = 'Product with this slug or sku already exists.',
  NotFoundProduct = 'Product not found',
  RemovedProductSuccess = 'Product removed successfully',
  CreatedProductSuccess = 'Product created successfully',
  UpdatedProductSuccess = 'Product Updated successfully.',
  SalePriceTooHigh = 'SalePrice cannot be higher than basePrice.',
  CreatedSeoMetaSuccess = 'Seo meta created successfully.',
  UpdatedSeoMetaSuccess = 'Seo meta updated successfully.',
  CannotChangeToSimpleType = 'Cannot change product type to SIMPLE while there are undelivered orders.',
  CannotDraftProductWithPendingOrders = 'Cannot set product status to DRAFT while there are undelivered orders.',
  CannotRemoveProduct = 'Cannot remove product: undelivered order items exist.',

  InvalidProductType = 'Only VARIABLE products can have a default variant',
  InvalidVariant = 'Invalid variant or not associated with this product',
  VariantNotAvailable = 'Default variant must be in stock',
  SetProductVariantSuccess = 'Default variant set successfully',
  DefaultVariantRemovedSuccess = 'Default variant remove successfully',
}
