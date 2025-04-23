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
