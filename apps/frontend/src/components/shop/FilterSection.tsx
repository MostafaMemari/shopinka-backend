"use client";

import { FC } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Accordion from "./Accordion";

interface FilterConfig {
  categories: string[];
  brands: { id: string; label: string; value: string }[];
  colors: { id: string; label: string; color: string }[];
}

interface FilterSectionProps {
  onFilterChange?: (filters: any) => void;
  config: FilterConfig;
}

const FilterSection: FC<FilterSectionProps> = ({ onFilterChange, config }) => {
  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="sticky top-32 mb-4 overflow-hidden rounded-lg bg-muted shadow-base">
        <div dir="ltr" className="flex max-h-[calc(95vh_-_100px)] flex-col overflow-y-auto overflow-x-hidden px-4 py-3">
          <div dir="rtl">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="xl:text-lg">فیلتر محصولات</h3>
              <button className="btn-primary-nobg py-2 text-sm">حذف همه</button>
            </div>
            <ul className="space-y-6">
              {/* جستجو */}
              <li>
                <label className="sr-only">جستجوی فروشگاه</label>
                <input
                  className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
                  placeholder="جستجو در بین نتایج ..."
                  type="text"
                />
              </li>
              {/* محدوده قیمت */}
              <li>
                <div>
                  <p className="mb-4">محدوده قیمت</p>
                  <div className="space-y-4">
                    <div id="shop-price-slider"></div>
                    <div className="flex items-center justify-between">
                      <div className="text-primary">
                        <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-min"></span>
                        <span className="text-xs">تومان</span>
                      </div>
                      <div className="text-primary">
                        <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-max"></span>
                        <span className="text-xs">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              {/* دسته‌بندی‌ها */}
              <Accordion title="دسته بندی ها">
                <ul className="space-y-2 rounded-lg">
                  {config.categories.map((category, index) => (
                    <li key={index}>
                      <a className="flex items-center gap-x-2 rounded-lg px-4 py-3" href="#">
                        <span>{category}</span>
                        <FiChevronLeft className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Accordion>
              {/* برندها */}
              <Accordion title="برند ها">
                <ul className="space-y-2 rounded-lg" id="brandListFilterDesktop">
                  <li className="p-2">
                    <label className="sr-only">جستجوی برند</label>
                    <input
                      id="brandListFilterDesktopSearchInput"
                      className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
                      placeholder="جستجوی برند ..."
                      type="text"
                    />
                  </li>
                  {config.brands.map((brand) => (
                    <li key={brand.id}>
                      <div className="flex w-full items-center gap-x-2 pr-4">
                        <input
                          id={brand.id}
                          type="checkbox"
                          value=""
                          className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
                        />
                        <label
                          htmlFor={brand.id}
                          className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
                        >
                          <span>{brand.label}</span>
                          <span>{brand.value}</span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </Accordion>
              {/* رنگ‌ها */}
              <Accordion title="رنگ ها">
                <ul className="space-y-2 rounded-lg" id="colorListFilterDesktop">
                  <li className="p-2">
                    <label className="sr-only">جستجوی رنگ</label>
                    <input
                      id="colorListFilterDesktopSearchInput"
                      className="w-full rounded-lg border-none bg-background px-2 py-3 text-text/90 outline-none placeholder:text-sm placeholder:text-text/60 focus:ring-0"
                      placeholder="جستجوی رنگ ..."
                      type="text"
                    />
                  </li>
                  {config.colors.map((color) => (
                    <li key={color.id}>
                      <div className="flex w-full items-center gap-x-2 pr-4">
                        <input
                          id={color.id}
                          type="checkbox"
                          value=""
                          className="h-4 w-4 cursor-pointer rounded-xl bg-background dark:border-gray-600 dark:bg-zinc-700"
                        />
                        <label
                          htmlFor={color.id}
                          className="flex w-full cursor-pointer items-center justify-between py-2 pl-4 font-medium text-text/90"
                        >
                          <span>{color.label}</span>
                          <span
                            className="h-4 w-4 rounded-full ring-2 ring-gray-200 dark:ring-zinc-700"
                            style={{ background: color.color }}
                          ></span>
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </Accordion>
              {/* فقط کالاهای موجود */}
              <li>
                <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlyAvailableDesktop">
                  <div>فقط کالا های موجود</div>
                  <div className="relative inline-flex cursor-pointer items-center">
                    <input className="peer sr-only" id="onlyAvailableDesktop" type="checkbox" />
                    <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
                  </div>
                </label>
              </li>
              {/* فقط محصولات ویژه */}
              <li>
                <label className="flex cursor-pointer items-center justify-between py-3" htmlFor="onlySpecialDesktop">
                  <div>فقط محصولات ویژه</div>
                  <div className="relative inline-flex cursor-pointer items-center">
                    <input className="peer sr-only" id="onlySpecialDesktop" type="checkbox" />
                    <div className="peer h-6 w-11 rounded-full bg-background after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-muted after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-focus:ring-emerald-500 dark:bg-zinc-800 peer-focus:dark:ring-emerald-400"></div>
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
