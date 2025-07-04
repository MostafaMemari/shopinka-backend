import { getProducts } from '@/service/productService';
import CarouselProduct from '@/components/features/product/ProductCarousel';
import { getBlogs } from '@/service/blogService';

import { getCategoryBySlug } from '@/service/categoryService';
import CategoryCirclesBanners from '@/components/features/CategoryBanners';
import BannerSlider from '@/components/features/carousel/BannerSlider';
import CarouselBlog from '@/components/features/blog/CarouselBlog';

export default async function Home() {
  const [discountProducts, newestProducts, blogs, categories] = await Promise.all([
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
    getBlogs({ take: 14 }),
    getCategoryBySlug('car-sticker'),
  ]);

  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />

      <div className="w-full max-w-screen-xl mx-auto">
        <BannerSlider />
      </div>
      <CarouselProduct title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
      <CarouselProduct title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
      <CategoryCirclesBanners basePath={`/product-category/${categories.slug}`} categories={categories.children} />
      <CarouselBlog title="آخرین مقالات" blogs={blogs.items} viewAllLink="/shop?sortBy=newest" />
    </>
  );
}
