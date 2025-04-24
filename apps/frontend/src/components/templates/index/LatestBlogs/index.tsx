import CarouselBlog from "@/components/ui/CarouselBlog";
import { latestBlogs } from "@/mock/BlogCarousels";

const LatestBlogs = () => {
  return (
    <div>
      <CarouselBlog sectionTitle="مطالب خواندنی" viewAllLink="/blog" viewAllText="مشاهده همه" blogs={latestBlogs} />
    </div>
  );
};

export default LatestBlogs;
