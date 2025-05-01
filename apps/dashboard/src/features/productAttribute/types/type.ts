export type AttributeType = "COLOR" | "BUTTON";

export interface IProductAttribute {
  id?: number | string;
  name: string;
  slug: string;
  type: AttributeType;
  description?: string;
  values?: string[];
}

export interface IProductAttributeFormValues {
  id?: number;
  name: string;
  slug: string;
  type: AttributeType;
  description: string;
}

export interface IProductAttributeUpdatePayload {
  name?: string;
  slug?: string;
  type?: AttributeType;
  description?: string;
}
