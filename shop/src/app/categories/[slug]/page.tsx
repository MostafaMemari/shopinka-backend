'use client';

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Category: {slug}</h1>
      <p>
        This is the category page for <strong>{slug}</strong>. Category products will appear here.
      </p>
    </div>
  );
}
