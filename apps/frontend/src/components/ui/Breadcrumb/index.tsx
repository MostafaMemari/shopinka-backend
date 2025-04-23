import React from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi"; // فرض کردم از react-icons استفاده می‌کنی

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  forceRender?: "desktop" | "mobile"; // prop جدید برای کنترل اجباری رندر
}

const Breadcrumb = ({ items, forceRender }: BreadcrumbProps) => {
  const renderDesktop = forceRender === "desktop";
  const renderMobile = forceRender === "mobile";

  return (
    <>
      <div className={renderMobile ? "hidden" : renderDesktop ? "block" : "hidden lg:block"}>
        <div className="mb-6">
          <nav aria-label="Breadcrumb" className="w-fit rounded-lg bg-muted px-4 py-4 shadow-base">
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <Link href={item.href} className="text-sm text-text/90 hover:underline">
                    {item.label}
                  </Link>
                  {index < items.length - 1 && (
                    <span className="text-text/90">
                      <HiChevronLeft className="h-5 w-5" />
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <div className={renderDesktop ? "hidden" : renderMobile ? "block" : "lg:hidden"}>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-x-1 text-sm font-light text-primary sm:text-base">
              <Link href={item.href}>{item.label}</Link>
              {index < items.length - 1 && <HiChevronLeft className="h-5 w-5" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Breadcrumb;
