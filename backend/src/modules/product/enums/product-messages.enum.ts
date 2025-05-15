export enum ProductMessages {
    AlreadyExistsProduct = 'Product with this slug or sku already exists.',
    NotFoundProduct = 'Product not found',
    RemovedProductSuccess = 'Product removed successfully',
    CreatedProductSuccess = 'Product created successfully',
    UpdatedProductSuccess = 'Product Updated successfully.',
    SalePriceTooHigh = 'SalePrice cannot be higher than basePrice.',
    CreatedSeoMetaSuccess = "Seo meta created successfully.",
    UpdatedSeoMetaSuccess = "Seo meta updated successfully.",
    CannotChangeToVariableType = "Cannot change product type to VARIABLE while there are undelivered orders.",
    CannotDraftProductWithPendingOrders = "Cannot set product status to DRAFT while there are undelivered orders."
}