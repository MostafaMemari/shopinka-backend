export interface IProductAttribute {
  id?: number | string;
  name: string;
  slug: string;
  type: "COLOR" | "BUTTON";
  description?: string;
}
