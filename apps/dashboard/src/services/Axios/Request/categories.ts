import httpService from "../Configs/httpService";

//* Category Service
export const getCategoriesService = (): Promise<any> => {
  return httpService.get("/categories");
};

export const createCategoryService = (values: { name: string }): Promise<any> => {
  return httpService.post("/categories", { name: values.name });
};

export const removeCategoryService = (colorId: number): Promise<any> => {
  return httpService.delete(`/categories/${colorId}`);
};

export const updateCategoryService = (colorId: number, values: { name: string }): Promise<any> => {
  return httpService.put(`/categories/${colorId}`, { name: values.name });
};
