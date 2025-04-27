"use client";

import { ICategory } from "@/lib/types/categories";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineMenu } from "react-icons/hi";

interface DesktopNavbarProps {
  categories: ICategory[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId) || categories[0];

  return (
    <nav className="container relative flex max-w-[1680px] items-center gap-x-2">
      <ul className="group z-10" id="desktopMegamenuWrapper" onMouseLeave={() => setSelectedCategoryId(null)}>
        <div
          className="relative flex cursor-pointer items-center gap-x-2 pb-2"
          onMouseEnter={() => setSelectedCategoryId(categories[0].id)}
        >
          <div>
            <HiOutlineMenu className="h-5 w-5" />
          </div>
          <div>دسته‌بندی‌ها</div>
        </div>

        {/* Mega menu */}
        <div className="absolute top-full w-full max-w-[1000px]">
          <div
            className={`relative rounded-b-lg bg-muted shadow-base transition-all duration-300 ${
              selectedCategoryId ? "block" : "hidden group-hover:block"
            }`}
            id="desktopMegamenu"
          >
            <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden rounded-b-lg pt-0.5">
              {/* Right side - Parent Categories */}
              <div className="main-scroll w-50 overflow-y-auto bg-background" dir="ltr">
                <ul dir="rtl" id="mega-menu-parents">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        className={`flex py-4 pr-4 ${category.id === selectedCategoryId ? "text-primary" : ""}`}
                        href={category.href}
                        onMouseEnter={() => setSelectedCategoryId(category.id)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Left side - Subcategories */}
              <div className="main-scroll h-[450px] max-h-[450px] w-full overflow-auto" dir="ltr">
                <div className="flex grow p-5" dir="rtl" id="mega-menu-childs">
                  <div className="w-full">
                    {/* Head - View All */}
                    <div className="mb-4">
                      <Link className="flex items-center gap-x-1 py-2 text-sm text-primary" href={selectedCategory.href}>
                        <div>مشاهده همه</div>
                        <HiOutlineChevronLeft className="h-5 w-5" />
                      </Link>
                    </div>

                    {/* Subcategories List */}
                    <div className="flex grow flex-wrap gap-x-14 gap-y-8">
                      {selectedCategory.subCategories?.map((subCategory) => (
                        <div key={subCategory.id} className="space-y-2">
                          <Link className="flex items-center gap-x-2 hover:text-primary" href={subCategory.href}>
                            <span className="h-5 w-0.5 rounded-full bg-primary dark:bg-primary"></span>
                            <div>{subCategory.name}</div>
                            <HiOutlineChevronLeft className="h-5 w-5" />
                          </Link>
                          <ul>
                            <li>
                              <Link className="block py-2 text-sm text-text/90 hover:text-primary" href={subCategory.href}>
                                {subCategory.name}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>

      <div
        id="header-desktop-navbar-indicator"
        className="absolute bottom-0 h-[0.15625rem] z-0 rounded-2xl end-0 transition-all duration-[350ms] w-0"
      ></div>
    </nav>
  );
};

export default DesktopNavbar;
