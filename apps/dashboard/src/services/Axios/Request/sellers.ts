import { Seller } from "../../../features/sellers/types/type";
import httpService from "../Configs/httpService";

//* Category Service
export const getSellersService = (): Promise<any> => {
  return httpService.get("/sellers");
};

export const createSellersService = (values: Seller): Promise<any> => {
  const payload = {
    name: values.name ? values.name : undefined,
    seller_id: values.seller_id ? values.seller_id : undefined,
    email: values.email ? values.email : undefined,
    phone: values.phone ? values.phone : undefined,
  };
  return httpService.post("/sellers", payload);
};

export const removeSellerService = (colorId: number): Promise<any> => {
  return httpService.delete(`/sellers/${colorId}`);
};

export const updateSellerService = (colorId: number, values: Seller): Promise<any> => {
  const payload = {
    name: values.name ? values.name : undefined,
    seller_id: values.seller_id ? values.seller_id : undefined,
    email: values.email ? values.email : undefined,
    phone: values.phone ? values.phone : undefined,
  };

  return httpService.put(`/sellers/${colorId}`, payload);
};
