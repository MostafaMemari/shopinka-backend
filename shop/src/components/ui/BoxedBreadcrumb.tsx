import { IBreadcrumb } from '@/lib/types/breadcrumb';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';

interface Props {
  items: IBreadcrumb[];
}

export default function BoxedBreadcrumb({ items }: Props) {
  return (
    <div className="mb-6">
      <nav aria-label="Breadcrumb" className="w-fit rounded-lg bg-muted px-4 py-4 shadow-base">
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-x-2">
              <Link href={item.href} className="text-sm text-text/90 hover:underline">
                {item.label}
              </Link>
              {index < items.length - 1 && <HiChevronLeft className="h-5 w-5 text-text/90" />}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
