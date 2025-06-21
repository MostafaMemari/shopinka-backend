import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/service/blogService';
import BlogDetailsView from '@/components/blog/BlogDetailsView';
import { NoImage } from '@/types/noImageEnum';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return notFound();

  return (
    <>
      <BlogDetailsView
        title={blog.title}
        content={blog.content ?? ''}
        createdAt={blog.createdAt}
        image={blog.mainImage?.fileUrl ? blog.mainImage?.fileUrl : NoImage.BLOG}
        username={blog.user.fullName ?? 'نامشخص'}
      />
    </>
  );
}
