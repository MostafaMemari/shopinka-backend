import { getProducts } from '@/service/productService';
import CarouselProduct from '@/components/product/ProductCarousel';
import BannerSlider from '@/components/Carousel/BannerSlider';
import CarouselBlog from '@/components/blog/CarouselBlog';
import { getBlogs } from '@/service/blogService';

export default async function Home() {
  const [discountProducts, newestProducts, blogs] = await Promise.all([
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
    getBlogs({ take: 14 }),
  ]);

  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />

      <div className="w-full max-w-screen-xl mx-auto">
        <BannerSlider />
      </div>
      <CarouselProduct title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
      <CarouselProduct title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
      <CarouselBlog title="آخرین مقالات" blogs={blogs.items} viewAllLink="/shop?sortBy=newest" />

      {/* <CategoryCirclesBanners categories={categories.items} /> */}
    </>
  );
}
