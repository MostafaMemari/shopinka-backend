export type Attribute = {
  id: number;
  name: string;
  slug: string;
  userId: number;
  type: 'COLOR' | 'BUTTON';
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AttributeValues = {
  id: number;
  name: string;
  slug: string;
  colorCode: string | null;
  buttonLabel: string | null;
  attributeId: number;
  createdAt: string;
  updatedAt: string;
};
