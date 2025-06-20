import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogItem } from '@/types/blogType';
import { NoImage } from '@/types/noImageEnum';

interface Props {
  blog: BlogItem;
}

const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <div>
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative rounded-xl bg-muted p-2 shadow-base">
          <div className="mb-2 md:mb-5" draggable={false}>
            <Image
              src={blog?.mainImage?.fileUrl ?? NoImage.BLOG}
              alt={blog.title}
              width={300}
              height={200}
              className="mx-auto w-auto rounded-lg rounded-bl-3xl"
              loading="lazy"
            />
          </div>
          <div className="mb-2">
            <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">{blog.title}</p>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-primary xs:text-sm">{blog.createdAt}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
