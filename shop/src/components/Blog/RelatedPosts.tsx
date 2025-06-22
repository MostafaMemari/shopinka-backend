import { BlogItem } from '@/types/blogType';
import { NoImage } from '@/types/noImageEnum';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface RelatedPosts {
  postCount: number;
  posts: BlogItem[];
}

const RelatedPosts: FC<RelatedPosts> = ({ postCount, posts }) => {
  return (
    <div className="mb-8 rounded-lg bg-muted px-2 py-3 shadow-base xl:px-4">
      <p className="mb-4 text-center text-sm font-medium xl:text-base">مطالب مرتبط</p>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`${post.slug}`} className="flex items-start gap-x-4">
              <div className="flex gap-x-2 xl:gap-x-4">
                <div className="min-w-fit">
                  <Image
                    src={post.mainImage?.fileUrl ?? NoImage.BLOG}
                    alt="blog"
                    width={64}
                    height={64}
                    className="w-16 rounded-xl xl:w-20"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="line-clamp-2 text-sm text-text/90 xl:text-base">{post.title}</p>
                  <p className="text-xs text-text/60 xl:text-sm">{post.createdAt}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <a href="#" className="btn-primary py-2">
            مشاهده همه ( {postCount} )
          </a>
        </li>
      </ul>
    </div>
  );
};

export default RelatedPosts;
