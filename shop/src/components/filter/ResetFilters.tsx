'use client';

import { useRouter } from 'next/navigation';

interface ResetFiltersProps {
  title?: string;
  buttonText?: string;
}

function ResetFilters({ title = 'فیلترها', buttonText = 'حذف همه' }: ResetFiltersProps) {
  const router = useRouter();

  const handleReset = () => {
    router.replace(window.location.pathname);
  };

  return (
    <div className="mb-6 flex items-center justify-between">
      <h3 className="xl:text-lg">{title}</h3>
      <button className="btn-primary-nobg py-2 text-sm cursor-pointer" onClick={handleReset}>
        {buttonText}
      </button>
    </div>
  );
}

export default ResetFilters;
