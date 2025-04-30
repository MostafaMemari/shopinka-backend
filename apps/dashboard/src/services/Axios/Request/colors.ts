import httpService from "../Configs/httpService";

//* Category Service
export const getColorsService = (): Promise<any> => {
  return httpService.get("/colors");
};

export const createColorsService = (values: { name: string }): Promise<any> => {
  return httpService.post("/colors", { name: values.name });
};

export const removeColorService = (colorId: number): Promise<any> => {
  return httpService.delete(`/colors/${colorId}`);
};

export const updateColorService = (colorId: number, values: { name: string }): Promise<any> => {
  return httpService.put(`/colors/${colorId}`, { name: values.name });
};
