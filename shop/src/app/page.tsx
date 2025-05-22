import CategoryBanners from '@/components/CategoryBanners';
import CategoryCircles from '@/components/CategoryCircles';
import Header from '@/components/header';
import { latestProducts, popularProducts, specialOfferProducts } from '@/mock/productCarousels';
import { latestBlogs } from '@/mock/blogCarousels';
import CarouselBlog from '@/components/Carousel/CarouselBlog';
import BannerSlider from '@/components/Carousel/BannerSlider';
import CarouselProduct from '@/components/Carousel/CarouselProduct';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <Header />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <BannerSlider />
        <CarouselProduct title="پیشنهادات شگفت انگیز" products={specialOfferProducts} viewAllLink="/" />
        <CarouselProduct title="جدیدترین محصولات" products={latestProducts} viewAllLink="/" />
        <CategoryBanners />
        <CategoryCircles />
        <CarouselProduct title="پرفروشترین محصولات" products={popularProducts} viewAllLink="/" />
        <CarouselBlog sectionTitle="آخرین وبلاگ ها" blogs={latestBlogs} viewAllLink="/" />
      </main>

      <Footer />
    </>
  );
}
