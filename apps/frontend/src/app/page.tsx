import Banner from "@/components/templates/index/BannerSlider";
import CategoryBanners from "@/components/templates/index/CategoryBanners";
import LatestProducts from "@/components/templates/index/LatestProducts";
import PopularProducts from "@/components/templates/index/PopularProducts";

export default function Home() {
  return (
    <>
      <Banner />
      <LatestProducts />
      <PopularProducts />
      <CategoryBanners />
    </>
  );
}
