import { getProducts } from '@/service/productService';
import CarouselProduct from '@/components/product/ProductCarousel';
import BannerSlider from '@/components/Carousel/BannerSlider';

export default async function Home() {
  const [discountProducts, newestProducts] = await Promise.all([
    getProducts({ take: 14, hasDiscount: true }),
    getProducts({ take: 14, sortBy: 'newest' }),
  ]);

  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[400px]" />
      <main className="grow bg-background pb-14 pt-22 lg:pt-36">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <BannerSlider />
        </div>
        <CarouselProduct title="فروش ویژه" products={discountProducts.items} viewAllLink="/shop?hasDiscount=true" />
        <CarouselProduct title="جدیدترین محصولات" products={newestProducts.items} viewAllLink="/shop?sortBy=newest" />
      </main>
    </>
  );
}
