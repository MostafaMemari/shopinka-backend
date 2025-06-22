import { HiChevronLeft } from 'react-icons/hi';
import Link from 'next/link';

interface Props {
  items: { name: string; href: string }[];
  variant?: 'boxed' | 'compact';
}

const BreadcrumbContainer = ({ items, variant = 'boxed' }: Props) => {
  return (
    <>
      {variant === 'boxed' ? (
        <div className="mb-4">
          <nav aria-label="Breadcrumb" className="w-fit rounded-lg bg-muted px-4 py-4 shadow-base">
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <Link href={item.href} className="text-sm text-text/90 hover:underline">
                    {item.name}
                  </Link>
                  {index < items.length - 1 && <HiChevronLeft className="h-5 w-5 text-text/90" />}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      ) : (
        <div className="my-4 flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-x-1 text-sm font-light text-primary sm:text-base">
              <Link href={item.href} className="text-sm text-text/90 hover:underline">
                {item.name}
              </Link>
              {index < items.length - 1 && <HiChevronLeft className="h-5 w-5" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BreadcrumbContainer;
