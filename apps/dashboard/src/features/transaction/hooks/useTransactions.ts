import { useQuery } from "@tanstack/react-query";
import { getTransactionsProductService } from "../../../services/Axios/Request/transactions";

export function useTransactions(params: any) {
  const fetchProducts = () => getTransactionsProductService(params).then((res) => res.data);

  return useQuery<any, Error>({
    queryKey: ["transactions"],
    queryFn: fetchProducts,
    enabled: !!params,
    refetchOnWindowFocus: false,
  });
}
