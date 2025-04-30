import React, { useEffect } from "react";
import { FiltersProduct } from "../../features/product/types/type";

import TomSelectCategory from "../../components/TomSelect";
import TomSelectColor from "../../components/TomSelect";
import TomSelectSeller from "../../components/TomSelect";
import { FormInput } from "../../base-components/Form";
import TomSelect from "../../base-components/TomSelect";
import { useCategories } from "../../features/categories/hooks/useCategories";
import { useColors } from "../../features/colors/hooks/useColors";
import { useSellers } from "../../features/sellers/hooks/useSellers";

// **Types**
interface FiltersProps {
  filters: FiltersProduct;
  onFilterUpdate: (filterKey: keyof FiltersProduct, value: string | number) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterUpdate }) => {
  const { data: categories, isLoading: isLoadingCategory } = useCategories();
  const { data: colors, isLoading: isLoadingColor } = useColors();
  const { data: sellers, isLoading: isLoadingSeller } = useSellers();

  return (
    <div className="grid grid-cols-12 gap-3">
      {isLoadingColor && isLoadingCategory && isLoadingSeller ? (
        <div className="mt-2 text-sm text-center text-gray-500">در حال بارگذاری...</div>
      ) : (
        <>
          <div className="col-span-12 md:col-span-4">
            <TomSelectColor
              loading={isLoadingColor}
              value={filters.colorId || "0"}
              onChange={(value) => onFilterUpdate("colorId", value)}
              options={colors}
              placeholder="انتخاب رنگ"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <TomSelectCategory
              loading={isLoadingCategory}
              value={filters.categoryId || "0"}
              onChange={(value) => onFilterUpdate("categoryId", value)}
              options={categories}
              placeholder="انتخاب دسته‌بندی"
            />
          </div>

          <div className="col-span-12 md:col-span-4">
            <TomSelectSeller
              loading={isLoadingSeller}
              value={filters.sellerId || "0"}
              onChange={(value) => onFilterUpdate("sellerId", value)}
              options={sellers}
              placeholder="انتخاب فروشنده"
            />
          </div>
        </>
      )}

      <div className="col-span-6 md:col-span-3">
        <FormInput
          type="number"
          value={filters.minStock || ""}
          onChange={(e) => {
            const value: any = e.target.value;
            if (!isNaN(value) && Number(value) >= 0) {
              onFilterUpdate("minStock", Number(value));
            }
          }}
          placeholder="موجودی بیشتر از"
        />
      </div>

      <div className="col-span-6 md:col-span-3">
        <FormInput
          type="number"
          value={filters.maxStock || ""}
          onChange={(e) => {
            const value: any = e.target.value;
            if (!isNaN(value) && Number(value) >= 0) {
              onFilterUpdate("maxStock", Number(value));
            }
          }}
          placeholder="موجودی کمتر از"
        />
      </div>

      <div className="col-span-6 md:col-span-3">
        <TomSelect
          onChange={(value: "ASC" | "DESC") => onFilterUpdate("sortOrder", value)}
          value={filters.sortOrder || "0"}
          options={{ placeholder: "ترتیب موجودی" }}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <option value="ASC">صعودی</option>
          <option value="DESC">نزولی</option>
        </TomSelect>
      </div>

      <div className="col-span-6 md:col-span-3">
        <TomSelect
          onChange={(value: "ASC" | "DESC") => onFilterUpdate("updatedAt", value)}
          value={filters.updatedAt || "DESC"}
          options={{ placeholder: "آخرین تغییرات" }}
          className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
        >
          <option value="ASC">صعودی</option>
          <option value="DESC">نزولی</option>
        </TomSelect>
      </div>
    </div>
  );
};

export default Filters;
