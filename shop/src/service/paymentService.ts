import { shopApiFetch } from '@/server/api';
import { PaymentFormType, PaymentResponse, VerifyPaymentFormType, VerifyPaymentResponse } from '@/types/paymentType';

export const paymentCart = async (data: PaymentFormType): Promise<PaymentResponse> => {
  const res = await shopApiFetch('/payment', { method: 'POST', body: { ...data } });

  if (res.status >= 400 || !res.data) {
    throw new Error(res.data?.message || 'خطا در ثبت سفارش');
  }

  return res.data;
};

export const verifyPayment = async ({ Authority, Status }: VerifyPaymentFormType): Promise<VerifyPaymentResponse> => {
  const res = await shopApiFetch(`/payment/verify?Authority=${Authority}&Status=${Status}`, { method: 'GET' });

  // if (res.status >= 400 || !res.data) {
  //   throw new Error(res.data?.message || 'خطا در اعتبار سنجی پرداخت');
  // }

  return res.data;
};
