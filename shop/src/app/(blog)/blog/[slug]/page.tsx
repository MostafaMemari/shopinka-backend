'use client';

import { useParams } from 'next/navigation';

interface BlogPost {
  title: string;
  content: string;
  date: string;
  author: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  // TODO: Fetch blog post data based on slug
  const blogPost: BlogPost = {
    title: 'Sample Blog Post',
    content: 'This is a sample blog post content.',
    date: new Date().toLocaleDateString(),
    author: 'John Doe',
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{blogPost.title}</h1>
      <div className="text-gray-600 mb-8">
        <span>By {blogPost.author}</span>
        <span className="mx-2">•</span>
        <span>{blogPost.date}</span>
      </div>
      <div className="prose lg:prose-xl">
        <p>{blogPost.content}</p>
      </div>
    </article>
  );
}
