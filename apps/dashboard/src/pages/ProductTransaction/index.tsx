import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import Table from "../../base-components/Table";
import { useSearchParams } from "react-router-dom";

import { Toast } from "../../base-components/Toast";
import Pagination from "../../components/Pagination/Pagination";
import SearchInput, { SearchInputHandle } from "../../base-components/SearchInput";
import DataSummary from "../../base-components/DataSummary/DataSummary";

import LoadingIcon from "../../base-components/LoadingIcon";
import ProductCard from "./components/ProductCard";
import { TransactionType } from "../../features/transaction/types/enym";

import usePagination from "../../hooks/usePagination";
import { FiltersProduct } from "../../features/product/types/type";
import Filters from "../../components/FiltersProduct";
import { usePurchaseProducts, useSaleProducts } from "../../features/product/hooks/useProducts";

interface MainProps {
  transactionType: TransactionType;
}

const Main: React.FC<MainProps> = ({ transactionType }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, search, updatePage, updateLimit, updateSearch } = usePagination();

  const searchInputRef = useRef<SearchInputHandle>(null);

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FiltersProduct>(() => {
    const urlFilters: FiltersProduct = {};
    searchParams.forEach((value, key) => {
      if (key !== "page" && key !== "limit" && key !== "search") {
        urlFilters[key as keyof FiltersProduct] = value;
      }
    });
    return urlFilters;
  });

  const { data, isLoading, isFetching, error, refetch } =
    transactionType === TransactionType.PURCHASE
      ? useSaleProducts({ page, limit, search, ...filters })
      : usePurchaseProducts({ page, limit, search, ...filters });

  // Refetch when dependencies change
  useEffect(() => {
    refetch();
  }, [page, limit, search, filters, refetch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Update filter params
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    // Update pagination and search params
    if (page > 1) params.set("page", page.toString());
    else params.delete("page");

    if (limit !== 10) params.set("limit", limit.toString());
    else params.delete("limit");

    if (search) params.set("search", search);
    else params.delete("search");

    setSearchParams(params);
  }, [filters, page, limit, search]);

  // Initialize page, limit, and search from URL params
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const searchParam = searchParams.get("search");

    if (pageParam) updatePage(parseInt(pageParam));
    if (limitParam) updateLimit(parseInt(limitParam));
    if (searchParam) {
      updateSearch(searchParam);
      if (searchInputRef.current) {
        searchInputRef.current.setValue(searchParam);
      }
    }
  }, []);

  useEffect(() => {
    if (error) {
      Toast("دریافت اطلاعات با خطا مواجه شد", "error");
    }
  }, [error]);

  const handleSearch = (searchValue: string) => {
    if (searchValue !== search) updateSearch(searchValue);
  };

  const handleFilterUpdate = (filterKey: keyof FiltersProduct, value: string | number) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value) {
        newFilters[filterKey] = value;
      } else {
        delete newFilters[filterKey];
      }
      return newFilters;
    });
    updatePage(1); // Reset to first page when filter changes
  };

  const handlePageChange = updatePage;
  const handleLimitChange = updateLimit;

  const resetSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.clearAndFocus();
    }
    updateSearch("");
  };

  const handleProductSubmission = () => {
    if (search === "" && page === 1) {
      refetch();
    } else {
      updatePage(1);
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center justify-between col-span-12 mt-2 intro-y sm:flex-nowrap">
          <h2 className="text-lg font-medium intro-y">{transactionType === TransactionType.PURCHASE ? "خرید" : "فروش"} محصول</h2>

          {((!isLoading || !isFetching) && data?.products && <DataSummary pagination={data.pagination} />) || (
            <div className="hidden mx-auto md:block text-slate-500"></div>
          )}

          <SearchInput ref={searchInputRef} searchType="change" debounceDelay={300} onSearch={handleSearch} />
        </div>
        <div className="col-span-12 intro-y">
          <Filters filters={filters} onFilterUpdate={handleFilterUpdate} />
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible">
          <Table className="border-spacing-y-[10px] border-separate -mt-2 text-start">
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="flex flex-col items-center">
                  <LoadingIcon icon="puff" className="w-12 h-12" />
                  <div className="mt-2 text-sm text-center text-gray-500">در حال بارگذاری...</div>
                </div>
              </div>
            ) : data?.products ? (
              <ProductCard
                resetSearch={resetSearch}
                onSuccess={handleProductSubmission}
                products={data?.products}
                transactionType={transactionType}
              />
            ) : (
              <h2 className="text-center">هیچ محصولی یافت نشد</h2>
            )}
          </Table>
        </div>

        {isLoading || isFetching ? null : data?.pagination ? (
          <Pagination
            page={page}
            limit={limit}
            pageCount={data?.pagination.pageCount}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        ) : null}
      </div>
    </>
  );
};

export default Main;
