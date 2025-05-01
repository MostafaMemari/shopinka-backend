import { IProductAttribute } from "../../../../features/productAttribute/types/type";
import httpService from "../../Configs/httpService";

export const createdProductAttributeService = async (data: Partial<IProductAttribute>) => {
  try {
    return await httpService.post("/attribute", { ...data });
  } catch (error: any) {
    throw {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || "Failed to Create Product Attribute",
    };
  }
};
export const updateProductAttributeService = async (attributeId: number, data: Partial<IProductAttribute>) => {
  try {
    console.log(`/attribute/${attributeId}`, { ...data });
    return await httpService.patch(`/attribute/${attributeId}`, { ...data });
  } catch (error: any) {
    throw {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || "Failed to Update Product Attribute",
    };
  }
};

export const removeProductAttributeService = (attributeId: number): Promise<any> => {
  try {
    return httpService.delete(`/attribute/${attributeId}`);
  } catch (error: any) {
    throw {
      status: error?.response?.status || 500,
      message: error?.response?.data?.message || "Failed to Remove Product Attribute",
    };
  }
};

export const getProductAttributeService = async (params: any): Promise<any> => {
  const res = await httpService.get("/attribute", { params });

  return res;
};
