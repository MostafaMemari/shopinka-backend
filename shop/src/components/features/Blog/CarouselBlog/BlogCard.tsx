import { FC } from 'react';
import Link from 'next/link';
import { BlogItem } from '@/types/blogType';
import BlogImage from './BlogImage';
import { NoImage } from '@/types/noImageEnum';

interface Props {
  blog: BlogItem;
}

const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <article className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
      <Link href={`/blog/${blog.slug}`}>
        <div className="relative rounded-xl bg-muted p-2 shadow-base">
          <div className="mb-2 md:mb-5" draggable={false}>
            <BlogImage src={blog?.mainImage?.fileUrl ?? NoImage.BLOG} alt={blog.title} />
          </div>
          <div className="mb-2">
            <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">{blog.title}</p>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-primary xs:text-sm">
              {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
