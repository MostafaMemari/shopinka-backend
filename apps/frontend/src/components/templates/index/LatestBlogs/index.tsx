import CarouselBlog from "@/components/ui/CarouselBlog";

const LatestBlogs = () => {
  const blogs = [
    {
      id: 1,
      imageSrc: "/images/blog/blog1.jpg",
      title: "مزایا و معایب گوشی‌های سری گلکسی S21",
      date: "29 / شهریور / 1403",
      link: "/blog-detail",
    },
    {
      id: 2,
      imageSrc: "/images/blog/blog1.jpg",
      title: "مزایا و معایب گوشی‌های سری گلکسی S21",
      date: "29 / شهریور / 1403",
      link: "/blog-detail",
    },
    {
      id: 3,
      imageSrc: "/images/blog/blog1.jpg",
      title: "مزایا و معایب گوشی‌های سری گلکسی S21",
      date: "29 / شهریور / 1403",
      link: "/blog-detail",
    },
    {
      id: 4,
      imageSrc: "/images/blog/blog1.jpg",
      title: "مزایا و معایب گوشی‌های سری گلکسی S21",
      date: "29 / شهریور / 1403",
      link: "/blog-detail",
    },
  ];

  return (
    <div>
      <CarouselBlog sectionTitle="مطالب خواندنی" viewAllLink="/blog" viewAllText="مشاهده همه" blogs={blogs} />
    </div>
  );
};

export default LatestBlogs;
