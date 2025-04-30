import _, { filter } from "lodash";
import { useEffect, useRef, useState } from "react";
import Button from "../../base-components/Button";
import Table from "../../base-components/Table";
import ProductTable from "./components/ProductTable";

import { Toast } from "../../base-components/Toast";
import Pagination from "../../components/Pagination/Pagination";
import SearchInput, { SearchInputHandle } from "../../base-components/SearchInput";
import DataSummary from "../../base-components/DataSummary/DataSummary";

import LoadingIcon from "../../base-components/LoadingIcon";
import CreateAndUpdateProductModal from "../../components/ProductFormModal";
import usePagination from "../../hooks/usePagination";
import { FiltersProduct } from "../../features/product/types/type";

import Filters from "../../components/FiltersProduct";
import { useProducts } from "../../features/product/hooks/useProducts";
import { useSearchParams } from "react-router-dom";

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, search, updatePage, updateLimit, updateSearch } = usePagination();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState();

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

  const { data, isLoading, isFetching, error, refetch } = useProducts({ page, limit, search });

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
      <h2 className="mt-10 text-lg font-medium intro-y">لیست محصولات</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
          <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
            ثبت محصول جدید
          </Button>
          {isOpenCreateModal && (
            <CreateAndUpdateProductModal onSuccess={handleProductSubmission} onClose={() => setIsOpenCreateModal(false)} />
          )}

          {((!isLoading || !isFetching) && data?.products && <DataSummary pagination={data.pagination} />) || (
            <div className="hidden mx-auto md:block text-slate-500"></div>
          )}

          <SearchInput searchType="change" debounceDelay={300} onSearch={handleSearch} defaultValue={search} />
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
            ) : data?.products && data.products.length > 0 ? (
              <ProductTable products={data.products} onSuccess={handleProductSubmission} />
            ) : (
              <div className="flex items-center justify-center h-[300px]">
                <h2 className="text-center text-gray-500">هیچ محصولی یافت نشد</h2>
              </div>
            )}
          </Table>
        </div>

        {data?.pagination && data.pagination.pageCount > 0 && (
          <Pagination
            page={page}
            limit={limit}
            pageCount={data.pagination.pageCount}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        )}
      </div>
    </>
  );
}

export default Main;
