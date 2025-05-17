export enum ProductVariantMessages {
    AlreadyExistsProductVariant = 'ProductVariant with this sku already exists.',
    NotFoundProductVariant = 'ProductVariant not found',
    RemovedProductVariantSuccess = 'ProductVariant removed successfully',
    CreatedProductVariantSuccess = 'ProductVariant created successfully',
    UpdatedProductVariantSuccess = 'ProductVariant Updated successfully.',
    SalePriceTooHigh = 'SalePrice cannot be higher than basePrice.',
    CannotRemoveProductVariant = "Cannot remove productVariant: undelivered order items exist."
}