import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { IBlog } from "@/lib/types/blogs";

export interface Props {
  blog: IBlog;
}

export default function CarouselBlogCard({ blog }: Props) {
  return (
    <div>
      <Link href={blog.link}>
        <div className="relative rounded-xl bg-muted p-2 shadow-base">
          <div className="mb-2 md:mb-5" draggable="false">
            <Image
              alt="blog"
              className="mx-auto w-auto rounded-lg rounded-bl-3xl"
              src={blog.imageSrc}
              width={300}
              height={200}
              priority={false}
            />
          </div>
          <div className="mb-2">
            <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">
              {blog.title}
            </p>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-primary xs:text-sm">{blog.date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
