import CarouselBlog from "@/features/blog/CarouselBlog";
import { latestBlogs } from "@/mock/blogCarousels";

export default function LatestBlogs() {
  return (
    <div>
      <CarouselBlog sectionTitle="مطالب خواندنی" viewAllLink="/blog" viewAllText="مشاهده همه" blogs={latestBlogs} />
    </div>
  );
}
