import { Transaction } from '@prisma/client';

export type PaymentRedirectResult = {
  redirectUrl: string;
  message: string;
  payment: Transaction;
};
