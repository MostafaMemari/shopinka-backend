import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/Carousel";
import { IBanner } from "@/lib/types/banner";

type BannerSliderProps = {
  banners: { main: IBanner[]; side: IBanner[] };
};

const BannerSlider: FC<BannerSliderProps> = ({ banners }) => {
  const mainSliderItems = banners.main.map((banner) => (
    <Link href={banner.link} key={banner.id}>
      <Image
        src={banner.image}
        alt={banner.title}
        width={800}
        height={450}
        className="max-h-[450px] w-full object-cover"
        priority={banner.id === 1}
      />
    </Link>
  ));

  return (
    <section className="mb-8">
      <div className="container relative grid grid-cols-12 gap-x-4 gap-y-2">
        <div className="col-span-12 lg:col-span-8">
          <Carousel
            items={mainSliderItems}
            loop={true}
            autoplay={true}
            navigation={true}
            pagination={true}
            className="banner-slider rounded-lg shadow-base"
          />
        </div>
        <div className="col-span-12 hidden xs:block lg:col-span-4">
          <div className="flex h-full flex-row justify-between gap-x-2 lg:flex-col">
            {banners.side.map((banner) => (
              <div key={banner.id}>
                <Link href={banner.link}>
                  <Image src={banner.image} alt={banner.title} width={400} height={220} className="h-full w-full rounded-lg shadow-base" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
