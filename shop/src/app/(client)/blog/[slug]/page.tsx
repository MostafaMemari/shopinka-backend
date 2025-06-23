import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/service/blogService';
import { NoImage } from '@/types/noImageEnum';
import BlogDetailsView from '@/components/Blog/BlogDetailsView';
import Sidebar from '@/components/Blog/Sidebar';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  return (
    <>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,1fr)] gap-4">
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <BlogDetailsView
            title={blog.title}
            content={blog.content ?? ''}
            createdAt={blog.createdAt}
            image={blog.mainImage?.fileUrl ? blog.mainImage?.fileUrl : NoImage.BLOG}
            username={blog.user.fullName ?? 'نامشخص'}
          />
        </div>
        <Sidebar categoryIds={blog.categories?.map((category) => category.id)} />
      </div>
    </>
  );
}
