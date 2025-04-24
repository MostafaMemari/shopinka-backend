import BannerSlider from "@/components/templates/index/BannerSlider";
import CategoryBanners from "@/components/templates/index/CategoryBanners";
import CategoryCircles from "@/components/templates/index/CategoryCircles";
import LatestBlogs from "@/components/templates/index/LatestBlogs";
import PopularProducts from "@/components/templates/index/PopularProducts";
import SpecialOfferProducts from "@/components/templates/index/SpecialOfferProducts";
import LatestProducts from "@/components/templates/index/LatestProducts";
import Header from "@/components/modules/Header/Header";
import Footer from "@/components/modules/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <BannerSlider />
        <SpecialOfferProducts />
        <LatestProducts />
        <CategoryBanners />
        <CategoryCircles />
        <PopularProducts />
        <LatestBlogs />
      </main>

      <Footer />
    </>
  );
}
