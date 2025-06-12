import { ProductParams } from '@/types/productType';

export const buildProductParams = (
  values: {
    page: string;
    search: string;
    minPrice: string;
    maxPrice: string;
    categoryIds: string;
    stockStatus: string;
    hasDiscount: string;
    sortBy: string;
  },
  initialParams: Pick<ProductParams, 'take' | 'includeMainImage' | 'includeVariants' | 'attributeValueIds'>,
): ProductParams => ({
  page: parseInt(values.page) || 1,
  take: initialParams.take || 20,
  search: values.search || undefined,
  minPrice: values.minPrice ? parseFloat(values.minPrice) : undefined,
  maxPrice: values.maxPrice ? parseFloat(values.maxPrice) : undefined,
  categoryIds: values.categoryIds ? values.categoryIds.split(',').map(Number) : undefined,
  stockStatus: values.stockStatus === 'instock' ? 'instock' : 'all',
  hasDiscount: values.hasDiscount === 'true' ? true : undefined,
  sortBy: ['price_asc', 'price_desc', 'newest'].includes(values.sortBy) ? (values.sortBy as ProductParams['sortBy']) : undefined,
  includeMainImage: initialParams.includeMainImage,
  includeVariants: initialParams.includeVariants,
  attributeValueIds: initialParams.attributeValueIds,
});
