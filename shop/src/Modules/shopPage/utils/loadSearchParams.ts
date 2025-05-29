import { createLoader, parseAsInteger, parseAsString, parseAsBoolean } from 'nuqs/server';

export const coordinatesSearchParams = {
  search: parseAsString.withDefault(''),
  perPage: parseAsInteger.withDefault(10),
  offset: parseAsInteger.withDefault(1),
  page: parseAsInteger.withDefault(1),
  take: parseAsInteger.withDefault(20),
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

export const loadSearchParams = createLoader(coordinatesSearchParams);
