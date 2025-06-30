import CheckoutProgress from '@/components/features/checkout/CheckoutProgress';
import { verifyPayment } from '@/service/paymentService';
import Link from 'next/link';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { PiWarningCircleDuotone } from 'react-icons/pi';

const formatAmount = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

type PageProps = {
  searchParams: Promise<{ Authority: string; Status: 'OK' | 'NOK' }>;
};

export default async function Page({ searchParams }: PageProps) {
  const { Authority, Status } = await searchParams;

  const res = await verifyPayment({ Authority, Status });

  const isSuccess = Status === 'OK' && res.status === 'success';
  const payment = res.payment || {};
  const orderId = payment.orderId || '---';
  const trackingCode = payment.invoiceNumber || '---';
  const paymentDate = payment.createdAt ? formatDate(payment.createdAt) : '---';
  const amount = payment.amount ? formatAmount(payment.amount) : '---';

  return (
    <>
      <CheckoutProgress currentStep="payment" />
      <div className="col-span-12">
        <div className="rounded-lg bg-muted p-6 min-h-[320px] flex items-center justify-center">
          <div className="mx-auto w-full max-w-xl rounded-lg bg-background shadow p-6 flex flex-col items-center gap-y-8">
            <div className="flex flex-col items-center gap-3">
              {isSuccess ? <BiCheckCircle className="h-20 w-20 text-success" /> : <BiXCircle className="h-20 w-20 text-destructive" />}

              <h1 className={`text-center font-bold text-lg md:text-xl ${isSuccess ? 'text-success' : 'text-destructive'}`}>
                پرداخت سفارش {orderId} {isSuccess ? 'موفق' : 'ناموفق'} بود
              </h1>

              <p className="text-center text-muted-foreground">
                {isSuccess ? 'پرداخت با موفقیت انجام شد. سفارش شما در حال پردازش است.' : 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.'}
              </p>
            </div>

            <div className="w-full rounded border p-4 bg-muted/70 flex flex-col gap-y-3">
              <span className="font-medium text-base md:text-lg mb-2">جزئیات پرداخت</span>
              <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm md:text-base">
                <div className="flex flex-col items-center gap-1">
                  <span>شماره پیگیری</span>
                  <span className="font-mono tracking-wider">{trackingCode}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span>تاریخ پرداخت</span>
                  <span>{paymentDate}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span>مبلغ</span>
                  <span>{amount}</span>
                </div>
              </div>
            </div>

            {!isSuccess && (
              <div className="w-full flex flex-col gap-y-3">
                <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-md px-3 py-2">
                  <PiWarningCircleDuotone className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  <span className="text-xs md:text-sm text-yellow-700 dark:text-yellow-100">
                    سفارش شما تا <b className="text-destructive">۳۵</b> دقیقه دیگر حذف خواهد شد. برای تکمیل سفارش، پرداخت را انجام دهید.
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-700/50 rounded-md px-3 py-2">
                  <PiWarningCircleDuotone className="h-6 w-6 text-gray-400" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    در صورت کسر مبلغ، تا ۲۴ ساعت آینده به حساب شما بازمی‌گردد.
                  </span>
                </div>
              </div>
            )}

            <div className="flex w-full gap-3 mt-3">
              {isSuccess ? (
                <>
                  <Link href={`/profile/orders/${orderId}`} className="btn-primary w-full py-3 text-center">
                    مشاهده سفارش
                  </Link>
                  <Link href="/" className="btn-secondary w-full py-3 text-center">
                    بازگشت به خانه
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`/checkout/payment?order=${orderId}`} className="btn-primary w-full py-3 text-center">
                    پرداخت مجدد
                  </Link>
                  <Link href="/" className="btn-secondary w-full py-3 text-center">
                    بازگشت
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
