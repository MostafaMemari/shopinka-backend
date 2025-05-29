import { ProductParams } from '@/Modules/product/types/productType';
import { loadSearchParams } from '@/Modules/shopPage/utils/loadSearchParams';
import { parseArrayParam } from '@/Modules/shopPage/utils/parseArrayParam';
import { SearchParams } from 'next/dist/server/request/search-params';
import ProductListShopClient from '@/Modules/shopPage/views/ProductListShopClient';
import { getProducts } from '@/Modules/product/services/productService';
type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: ProductParams = {
    page: params.page ?? 1,
    take: params.perPage ?? 20,
    hasDiscount: params.hasDiscount ?? undefined,
    categoryIds: parseArrayParam(params.categoryIds ?? undefined),
    attributeValueIds: parseArrayParam(params.attributeValueIds ?? undefined),
    minPrice: params.minPrice ?? undefined,
    maxPrice: params.maxPrice ?? undefined,
    stockStatus: params.stockStatus === 'instock' ? 'instock' : 'all',
    search: params.search,
    includeMainImage: params.includeMainImage ?? false,
    includeVariants: params.includeVariants ?? false,
    sortBy:
      params.sortBy && ['price_asc', 'price_desc', 'newest'].includes(params.sortBy)
        ? (params.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const productResponse = await getProducts(query);

  return <ProductListShopClient query={query} initialProducts={productResponse.items || []} />;
}
