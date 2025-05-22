import { IProduct } from '@/lib/types/products';
import { Metadata } from 'next';

export async function fetchProducts(searchParams: { [key: string]: string | string[] | undefined }): Promise<Product[]> {
  const products: IProduct[] = Array(11)
    .fill({
      id: '1',
      title: 'کیف دوشی زنانه درسا مدل 49787',
      image: '/assets/images/products/p8.png',
      oldPrice: '10,000,000',
      newPrice: '400,000,000',
      discount: '60%',
      link: './product-detail',
      category: 'دسته بندی 1',
      brand: 'Nike',
      color: 'red',
      available: true,
      special: false,
    })
    .map((product, index) => ({
      ...product,
      id: `${index + 1}`,
      category: index % 2 === 0 ? 'دسته بندی 1' : 'دسته بندی 2',
      brand: index % 2 === 0 ? 'Nike' : 'adidas',
      color: index % 2 === 0 ? 'red' : 'blue',
      available: index % 3 !== 0,
      special: index % 4 === 0,
    }));

  let filteredProducts = products;

  if (searchParams.search) {
    const search = searchParams.search as string;
    filteredProducts = filteredProducts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  }
  if (searchParams.category) {
    const category = searchParams.category as string;
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }
  if (searchParams.brand) {
    const brand = searchParams.brand as string;
    filteredProducts = filteredProducts.filter((p) => p.brand === brand);
  }
  if (searchParams.color) {
    const color = searchParams.color as string;
    filteredProducts = filteredProducts.filter((p) => p.color === color);
  }
  if (searchParams.available === 'true') {
    filteredProducts = filteredProducts.filter((p) => p.available);
  }
  if (searchParams.special === 'true') {
    filteredProducts = filteredProducts.filter((p) => p.special);
  }

  if (searchParams.sort) {
    const sort = searchParams.sort as string;
    filteredProducts.sort((a, b) => {
      if (sort === 'new') return b.id.localeCompare(a.id); // جدیدترین (ID بالاتر)
      if (sort === 'sale') return b.discount.localeCompare(a.discount); // پرفروش (تخفیف بیشتر)
      if (sort === 'expensive') return parseInt(b.newPrice.replace(/,/g, '')) - parseInt(a.newPrice.replace(/,/g, '')); // گران‌ترین
      if (sort === 'cheap') return parseInt(a.newPrice.replace(/,/g, '')) - parseInt(b.newPrice.replace(/,/g, '')); // ارزان‌ترین
      return 0;
    });
  }

  const page = parseInt((searchParams.page as string) || '1', 10);
  const pageSize = 10;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  filteredProducts = filteredProducts.slice(start, end);

  return filteredProducts;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const search = searchParams.search ? `جستجو: ${searchParams.search}` : 'فروشگاه';
  const category = searchParams.category ? `دسته‌بندی: ${searchParams.category}` : '';
  const brand = searchParams.brand ? `برند: ${searchParams.brand}` : '';
  const title = `فروشگاه | ${[search, category, brand].filter(Boolean).join(' - ')}`;
  const description = `خرید آنلاین محصولات ${[category, brand].filter(Boolean).join(' و ')} با بهترین قیمت‌ها.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/shop?${new URLSearchParams(searchParams as any).toString()}`,
      type: 'website',
    },
  };
}
