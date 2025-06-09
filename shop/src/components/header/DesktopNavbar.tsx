'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineMenu } from 'react-icons/hi';
import { ICategory } from '@/lib/types/categories';

interface DesktopNavbarProps {
  categories: ICategory[];
}

interface MenuItem {
  id: number;
  name: string;
  href: string;
  subItems?: { id: number; name: string; href: string }[];
  color?: { light: string; dark: string };
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'فروش ویژه',
    href: './special-sale.html',
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 10,
    name: 'فروشگاه',
    href: '/shop',
    color: { light: '#ef4444', dark: '#f87171' },
  },
  {
    id: 2,
    name: 'چرا روتی کالا',
    href: './why-us.html',
  },
  {
    id: 3,
    name: 'راهنمای خرید',
    href: './how-to-buy.html',
  },
  {
    id: 4,
    name: 'سایر',
    href: '#',
    subItems: [
      { id: 1, name: 'تماس با ما', href: './contact.html' },
      { id: 2, name: 'درباره ما', href: './about.html' },
      { id: 3, name: 'سوالات متداول', href: './faq.html' },
    ],
  },
];

const MenuItems = () => {
  const [hoveredMenuId, setHoveredMenuId] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-x-2">
      {menuItems.map((menu) => (
        <div
          key={menu.id}
          className="group relative"
          dir="rtl"
          onMouseEnter={() => setHoveredMenuId(menu.id)}
          onMouseLeave={() => setHoveredMenuId(null)}
        >
          <div className="relative flex items-center">
            <Link
              href={menu.href}
              className="flex cursor-pointer items-center gap-x-2 p-2 text-sm text-neutral-600 dark:text-white hover:text-primary"
              style={
                menu.color ? ({ '--color-light': menu.color.light, '--color-dark': menu.color.dark } as React.CSSProperties) : undefined
              }
            >
              {menu.name}
              {menu.name === 'سایر' && <span className="text-primary">...</span>}
            </Link>
            <span
              className={`
                absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500
                ${hoveredMenuId === menu.id ? 'w-full' : 'w-0'}
              `}
            />
          </div>
          {menu.subItems && (
            <div className="absolute right-0 top-full hidden w-44 overflow-hidden rounded-b-lg bg-muted shadow-base group-hover:block">
              <ul className="space-y-1 p-2">
                {menu.subItems.map((subItem) => (
                  <li key={subItem.id}>
                    <Link
                      className="flex rounded-lg px-4 py-3 text-sm text-neutral-600 dark:text-white hover:text-primary"
                      href={subItem.href}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId) || categories[0];

  // مدیریت اسکرول برای مخفی/آشکار کردن منو
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`
        sticky top-0 z-30 bg-white dark:bg-neutral-950 border-b shadow-sm max-lg:hidden
        transition-all duration-700 px-4
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
    >
      <div className="container relative flex max-w-[1640px] items-center gap-x-2">
        <div
          className="group relative"
          onMouseEnter={() => setSelectedCategoryId(categories[0].id)}
          onMouseLeave={() => setSelectedCategoryId(null)}
        >
          <div className="flex cursor-pointer items-center gap-x-2 pt-2 mb-2">
            <HiOutlineMenu className="h-5 w-5 text-neutral-600 dark:text-white" />
            <span className="font-medium text-sm text-neutral-600 dark:text-white">دسته‌بندی‌ها</span>
            <span
              className={`
                absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-500
                ${selectedCategoryId ? 'w-full' : 'w-0'}
              `}
            />
          </div>

          <div
            className={`
              absolute right-0 top-full z-20 bg-muted shadow-base rounded-b-lg
              w-[800px] transition-all duration-300
              ${selectedCategoryId ? 'block' : 'hidden group-hover:block'}
            `}
          >
            <div className="flex h-[450px] max-h-[450px] w-full overflow-hidden rounded-b-lg pt-0.5">
              <div className="w-48 bg-background overflow-y-auto main-scroll">
                <ul dir="rtl">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        className={`
                          flex py-4 pr-4 text-sm
                          ${
                            category.id === selectedCategoryId
                              ? 'text-primary font-bold bg-white dark:bg-neutral-900'
                              : 'text-neutral-600 dark:text-neutral-100 hover:text-primary hover:bg-white dark:hover:bg-neutral-900'
                          }
                        `}
                        href={category.href}
                        onMouseEnter={() => setSelectedCategoryId(category.id)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 overflow-auto main-scroll">
                <div className="p-5" dir="rtl">
                  <div className="w-full">
                    <div className="mb-4">
                      <Link className="flex items-center gap-x-1 py-2 text-sm text-primary" href={selectedCategory.href}>
                        <span>مشاهده همه {selectedCategory.name}</span>
                        <HiOutlineChevronLeft className="h-5 w-5" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-3 gap-x-8 gap-y-8">
                      {selectedCategory.subCategories?.length ? (
                        selectedCategory.subCategories.map((subCategory) => (
                          <div key={subCategory.id} className="space-y-2">
                            <Link className="flex items-center gap-x-2 text-sm font-medium hover:text-primary" href={subCategory.href}>
                              <span className="h-5 w-0.5 rounded-full bg-primary dark:bg-primary"></span>
                              <span>{subCategory.name}</span>
                              <HiOutlineChevronLeft className="h-5 w-5" />
                            </Link>
                            {subCategory.subItems && (
                              <ul className="space-y-2">
                                {subCategory.subItems.map((subItem) => (
                                  <li key={subItem.id}>
                                    <Link className="block py-1 text-sm text-text/90 hover:text-primary" href={subItem.href}>
                                      {subItem.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="col-span-3 text-sm text-neutral-500 my-5">
                          محصولی برای <span className="text-primary font-bold">{selectedCategory.name}</span> وجود ندارد.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* منوهای جدید */}
        <MenuItems />

        <div
          id="header-desktop-navbar-indicator"
          className="absolute bottom-0 h-[0.15625rem] z-0 rounded-2xl end-0 transition-all duration-[350ms] w-0"
        />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
