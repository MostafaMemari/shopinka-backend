import Banner from "@/components/templates/index/BannerSlider";
import BestSellingProducts from "@/components/templates/index/BestSellingProducts";
import CategoryBanners from "@/components/templates/index/CategoryBanners";
import CategoryCircles from "@/components/templates/index/CategoryCircles";
import LatestBlogs from "@/components/templates/index/LatestBlogs";
import LatestProducts from "@/components/templates/index/LatestProducts";
import PopularProducts from "@/components/templates/index/PopularProducts";

export default function Home() {
  return (
    <>
      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>

      <Banner />
      <LatestProducts />
      <PopularProducts />
      <CategoryBanners />
      <CategoryCircles />
      <BestSellingProducts />
      <LatestBlogs />
    </>
  );
}
