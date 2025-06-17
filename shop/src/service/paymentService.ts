import { shopApiFetch } from '@/server/api';
import { PaymentFormType, PaymentResponse } from '@/types/paymentType';

export const paymentCart = async (data: PaymentFormType): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment', { method: 'POST', body: { ...data } });

  if (res.status >= 400 || !res.data?.comment) {
    throw new Error(res.data?.message || 'خطا در ثبت سفارش');
  }

  return res.data;
};
