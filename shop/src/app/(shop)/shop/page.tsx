import { getProducts } from '@/Modules/product/services/productService';
import { ProductParams } from '@/Modules/product/types/productType';
import ShopPageView from '@/Modules/shopPage/views/shopPageView';

type SearchParams = { [key: string]: string | string[] | undefined };

function parseArrayParam(param: string | string[] | undefined): number[] | undefined {
  if (!param) return undefined;
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(Number).filter(Boolean);
}

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;

  const query: ProductParams = {
    page: params.page ? Number(params.page) : 1,
    take: params.take ? Number(params.take) : 20,
    hasDiscount: params.hasDiscount === 'true' ? true : params.hasDiscount === 'false' ? false : undefined,
    categoryIds: parseArrayParam(params.categoryIds),
    attributeValueIds: parseArrayParam(params.attributeValueIds),
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    stockStatus: params.stockStatus === 'instock' ? 'instock' : 'all',
    search: typeof params.search === 'string' ? params.search : undefined,
    includeMainImage: params.includeMainImage === 'true',
    includeVariants: params.includeVariants === 'true',
    sortBy:
      typeof params.sortBy === 'string' && ['price_asc', 'price_desc', 'newest'].includes(params.sortBy)
        ? (params.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const [productsData] = await Promise.all([getProducts(query)]);

  return <ShopPageView products={productsData.items} />;
}
