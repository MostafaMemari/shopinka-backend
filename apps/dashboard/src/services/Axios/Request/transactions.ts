import { TransactionType } from "../../../features/transaction/types/enym";
import httpService from "../Configs/httpService";

export const transactionsProductService = (productId: number, transactionType: TransactionType, data: any) => {
  return httpService.post(`/transactions/product/${productId}/${transactionType}`, data);
};
export const getTransactionsProductService = (params: any) => {
  return httpService.get("/transactions", { params });
};
