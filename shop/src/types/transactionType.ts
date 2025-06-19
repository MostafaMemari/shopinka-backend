export type TransactionStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export type Transaction = {
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
};
