'use client';

import { useRouter } from 'next/navigation';

function ResetFiltersBlog() {
  const router = useRouter();

  const handleReset = () => {
    router.replace('/blog');
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="xl:text-lg">فیلتر محصولات</h3>
      <button className="btn-primary-nobg py-2 text-sm cursor-pointer" onClick={handleReset}>
        حذف همه
      </button>
    </div>
  );
}

export default ResetFiltersBlog;
