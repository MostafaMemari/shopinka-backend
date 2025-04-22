import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    id: 1,
    image: "/images/banners/category-right.jpg",
    alt: "بنر دسته‌بندی راست",
    link: "#",
  },
  {
    id: 2,
    image: "/images/banners/category-left.jpg",
    alt: "بنر دسته‌بندی چپ",
    link: "#",
  },
];

const CategoryBanners = () => {
  return (
    <section className="mb-8">
      <div className="container relative mx-auto">
        <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
          {banners.map((banner) => (
            <Link key={banner.id} href={banner.link}>
              <Image src={banner.image} alt={banner.alt} width={600} height={300} className="rounded-base w-full object-cover" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanners;
