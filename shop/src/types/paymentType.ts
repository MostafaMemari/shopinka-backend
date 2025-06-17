export interface PaymentFormType {
  addressId: number;
  shippingId: number;
  description: string;
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export interface Payment {
  id: number;
  userId: number;
  orderId: number;
  amount: number;
  invoiceNumber: string;
  status: TransactionStatus;
  authority: string;
  sessionId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentResponse {
  authority: string;
  code: number;
  gatewayURL: string;
}

export interface VerifyPaymentResponse {
  redirectUrl: string | undefined;
  payment: Payment;
  status: string;
  message: string;
}
export interface VerifyPaymentFormType {
  Authority: string;
  Status: string;
}
