import { getProducts } from '@/Modules/product/services/getProducts';
import { ProductParams } from '@/Modules/product/types/productType';

type SearchParams = { [key: string]: string | string[] | undefined };

function parseArrayParam(param: string | string[] | undefined): number[] | undefined {
  if (!param) return undefined;
  const str = Array.isArray(param) ? param[0] : param;
  return str.split(',').map(Number).filter(Boolean);
}

export default async function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const query: ProductParams = {
    page: searchParams.page ? Number(searchParams.page) : 1,
    take: searchParams.take ? Number(searchParams.take) : 20,
    hasDiscount: searchParams.hasDiscount === 'true' ? true : searchParams.hasDiscount === 'false' ? false : undefined,
    categoryIds: parseArrayParam(searchParams.categoryIds),
    attributeValueIds: parseArrayParam(searchParams.attributeValueIds),
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    stockStatus: searchParams.stockStatus === 'instock' ? 'instock' : 'all',
    search: typeof searchParams.search === 'string' ? searchParams.search : undefined,
    includeMainImage: searchParams.includeMainImage === 'true',
    includeVariants: searchParams.includeVariants === 'true',
    sortBy:
      typeof searchParams.sortBy === 'string' && ['price_asc', 'price_desc', 'price_newest'].includes(searchParams.sortBy)
        ? (searchParams.sortBy as ProductParams['sortBy'])
        : undefined,
  };

  const data = await getProducts(query);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">فروشگاه</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.items.map((product: any) => (
          <div key={product.id} className="border p-4 rounded">
            <h2>{product.name}</h2>
            <p>{product?.basePrice} تومان</p>
          </div>
        ))}
      </div>

      {/* صفحه‌بندی */}
      <div className="mt-6">
        صفحه {data.page} از {data.totalPages}
      </div>
    </div>
  );
}
