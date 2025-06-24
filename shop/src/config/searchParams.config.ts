import { parseAsBoolean, parseAsInteger, parseAsString } from 'nuqs/server';

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  perPage: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  hasDiscount: parseAsBoolean,
  categoryIds: parseAsString,
  attributeValueIds: parseAsString,
  minPrice: parseAsInteger,
  maxPrice: parseAsInteger,
  stockStatus: parseAsString.withDefault('all'),
  includeMainImage: parseAsBoolean.withDefault(false),
  includeVariants: parseAsBoolean.withDefault(false),
  sortBy: parseAsString,
};
