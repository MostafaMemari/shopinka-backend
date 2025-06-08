export type AddressFormType = {
  province: string;
  city: string;
  address: string;
  postalCode: string;
  receiverMobile: string;
  description: string;
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
