export type AddressFormType = {
  fullName: string;
  province: string;
  city: string;
  plate: string;
  unit: string | null;
  postalCode: string | null;
};

export type AddressItem = {
  id: number;
  userId: number;
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverMobile: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
