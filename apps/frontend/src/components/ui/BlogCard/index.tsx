import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";

export interface BlogCardProps {
  id: number;
  imageSrc: string;
  title: string;
  date: string;
  link: string;
}

// BlogCard Component
const BlogCard: React.FC<BlogCardProps> = ({ imageSrc, title, date, link }) => {
  return (
    <div>
      <Link href={link}>
        <div className="relative rounded-xl bg-muted p-2 shadow-base">
          <div className="mb-2 md:mb-5" draggable="false">
            <Image
              alt="blog"
              className="mx-auto w-auto rounded-lg rounded-bl-3xl"
              src={imageSrc}
              width={300}
              height={200}
              priority={false}
            />
          </div>
          <div className="mb-2">
            <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">{title}</p>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-primary xs:text-sm">{date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
