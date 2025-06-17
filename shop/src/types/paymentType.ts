export interface PaymentFormType {
  addressId: number;
  shippingId: number;
  description: string;
}

export interface PaymentResponse {
  authority: string;
  code: number;
  gatewayURL: string;
}
