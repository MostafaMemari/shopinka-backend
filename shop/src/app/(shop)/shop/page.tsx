import { ProductParams } from '@/Modules/product/types/productType';
import ProductsListLoading from '@/Modules/shopPage/components/ProductsListLoading';
import SortBar from '@/Modules/shopPage/components/SortBar';
import { loadSearchParams } from '@/Modules/shopPage/utils/loadSearchParams';
import { parseArrayParam } from '@/Modules/shopPage/utils/parseArrayParam';
import FilterSection from '@/Modules/shopPage/views/FilterSection';
import ProductListShop from '@/Modules/shopPage/views/ProductListShop';
import { revalidateTag } from 'next/cache';
import { SearchParams } from 'next/dist/server/request/search-params';
import { Suspense } from 'react';

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

  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <FilterSection />
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <SortBar />
        <Suspense fallback={<ProductsListLoading />}>
          <ProductListShop params={query} />
        </Suspense>
      </div>
    </div>
  );
}
