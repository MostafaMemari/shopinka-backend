"use client";

import FilterSection from "@/components/shop/FilterSection";
import MobileSort from "@/components/shop/MobileFilter";
import MobileFilter from "@/components/shop/MobileFilter";
import MobileFilterDrawer from "@/components/shop/MobileFilterDrawer";
import MobileOptions from "@/components/shop/MobileOptions";
import MobileSortDrawer from "@/components/shop/MobileSortDrawer";
import ProductGrid from "@/components/shop/ProductGrid";
import SortBar from "@/components/shop/SortBar";
import Pagination from "@/components/ui/Pagination";
import { latestProducts, specialOfferProducts } from "@/mock/productCarousels";
import { FC, useState } from "react";

interface FilterConfig {
  categories: string[];
  brands: { id: string; label: string; value: string }[];
  colors: { id: string; label: string; color: string }[];
}

const ShopPage: FC = () => {
  const filterConfig: FilterConfig = {
    categories: ["دسته بندی 1", "دسته بندی 2", "دسته بندی 3"],
    brands: [
      { id: "brand-nike", label: "نایک", value: "Nike" },
      { id: "brand-adidas", label: "آدیداس", value: "adidas" },
    ],
    colors: [
      { id: "color-red", label: "قرمز", color: "red" },
      { id: "color-blue", label: "آبی", color: "blue" },
    ],
  };

  const [sortOption, setSortOption] = useState("جدید ترین");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handleFilterChange = (filters: any) => {
    console.log("فیلترها:", filters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterClick = () => {
    setIsSortOpen(false); // بستن MobileSortDrawer
    setIsFilterOpen(true); // باز کردن MobileFilterDrawer
  };

  const handleSortClick = () => {
    setIsFilterOpen(false); // بستن MobileFilterDrawer
    setIsSortOpen(true); // باز کردن MobileSortDrawer
  };

  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
      <FilterSection onFilterChange={handleFilterChange} config={filterConfig} />
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <MobileOptions onFilterClick={handleFilterClick} onSortClick={handleSortClick} />
        <SortBar onSortChange={handleSortChange} />
        <ProductGrid products={latestProducts} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      <MobileFilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onFilterChange={handleFilterChange}
        config={filterConfig}
      />
      <MobileSortDrawer isOpen={isSortOpen} onClose={() => setIsSortOpen(false)} onSortChange={handleSortChange} />
    </div>
  );
};

export default ShopPage;
