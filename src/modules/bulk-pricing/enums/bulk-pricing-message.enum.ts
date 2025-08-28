export enum BulkPricingMessages {
  NotFoundBulkPricing = 'bulk pricing not found.',
  CreatedBulkPricingSuccess = 'bulk pricing created successfully.',
  UpdatedBulkPricingSuccess = 'bulk pricing updated successfully.',
  RemovedBulkPricingSuccess = 'bulk pricing removed successfully.',
  InvalidProductOrVariant = 'Only one of product or variant is allowed.',
  GlobalWithProductOrVariant = 'Global pricing cannot be combined with product or variant.',
  GlobalRequired = 'Global pricing is required when neither product nor variant is specified.',
  InvalidFixedDiscount = 'Fixed discount must be at least 1000.',
  InvalidPercentDiscount = 'Percentage discount cannot exceed 100%.',
  GlobalBulkPriceExists = 'A global bulk price for this minimum quantity already exists.',
  MinQtyBulkPriceExists = 'A bulk price for this minimum quantity already exists.',
}
