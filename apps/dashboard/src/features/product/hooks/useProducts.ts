import { useQuery } from "@tanstack/react-query";
import {
  getProductsService,
  getReportPurchaseProductsService,
  getReportSaleProductsService,
  getSettingProductsService,
} from "../../../services/Axios/Request/products";
import { TransactionType } from "../../transaction/types/enym";
import { FiltersProduct } from "../types/type";

// تعریف تایپ‌های ورودی و خروجی
interface TransactionVariables {
  productId: number;
  transactionType: TransactionType;
  quantity: number;
}

interface TransactionResult {
  status: number;
  message: string;
  data?: any;
}

interface ProductsParams {
  page: number;
  limit: number;
  search?: string;
  filters?: FiltersProduct;
}

export function useProducts({ page, limit, search, ...filters }: ProductsParams) {
  const fetchProducts = () => getProductsService({ page, limit, search, ...filters }).then((res) => res.data);

  return useQuery({
    queryKey: ["products", { page, limit, search, ...filters }],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
  });
}

export function usePurchaseProducts(params: any) {
  const fetchProducts = () => getReportPurchaseProductsService(params).then((res) => res.data);

  return useQuery<any, Error>({
    queryKey: ["purchase-products"],
    queryFn: fetchProducts,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
export function useSaleProducts(params: any) {
  const fetchProducts = () => getReportSaleProductsService(params).then((res) => res.data);

  return useQuery<any, Error>({
    queryKey: ["sale-products"],
    queryFn: fetchProducts,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
export function useSettingProducts(params: any) {
  const fetchProducts = () => getSettingProductsService(params).then((res) => res.data);

  return useQuery<any, Error>({
    queryKey: ["settings-products"],
    queryFn: fetchProducts,
    enabled: false,
    refetchOnWindowFocus: false,
  });
}
