'use client';

import { useRouter } from 'next/navigation';

interface ResetFiltersProps {
  title?: string;
  resetPath?: string;
  buttonText?: string;
}

function ResetFilters({ title = 'فیلترها', resetPath = '/', buttonText = 'حذف همه' }: ResetFiltersProps) {
  const router = useRouter();

  const handleReset = () => {
    router.replace(resetPath);
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
