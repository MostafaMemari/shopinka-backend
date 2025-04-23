import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const CompactBreadcrumb = ({ items }: Props) => (
  <div className="mb-4 flex flex-wrap items-center gap-2">
    {items.map((item, index) => (
      <div key={index} className="flex items-center gap-x-1 text-sm font-light text-primary sm:text-base">
        <Link href={item.href}>{item.label}</Link>
        {index < items.length - 1 && <HiChevronLeft className="h-5 w-5" />}
      </div>
    ))}
  </div>
);

export default CompactBreadcrumb;
