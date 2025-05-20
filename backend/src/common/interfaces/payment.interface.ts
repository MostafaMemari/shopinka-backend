export interface IVerifyPayment {
  authority: string;
  status: string;
}

export interface IRefund {
  sessionId: string;
  amount: number;
  description?: string;
  reason?: 'CUSTOMER_REQUEST' | 'DUPLICATE_TRANSACTION' | 'SUSPICIOUS_TRANSACTION' | 'OTHER';
}

export interface IPaymentRefund extends Omit<IRefund, 'sessionId' | 'amount'> {
  transactionId: number;
}

export interface IPagination {
  take?: number;
  page?: number;
}
