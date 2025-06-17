import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import { verifyPayment } from '@/service/paymentService';
import Link from 'next/link';
import { SearchParams } from 'nuqs';
import React from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { PiWarningCircleDuotone } from 'react-icons/pi';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

async function page({ searchParams }: PageProps) {
  const { Authority, Status } = await searchParams;

  const { payment, message, status } = await verifyPayment({ Authority: Authority as string, Status: Status as string });

  console.log(payment, message, status);

  return (
    <>
      <CheckoutProgress currentStep="payment" />

      <div className="col-span-12">
        <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
          {status === 'success' ? (
            <div className="mx-auto rounded-lg bg-muted p-5">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <div>
                  <BiCheckCircle className="h-20 w-20 text-success" />
                </div>
                <h1 className="mb-8 text-center text-base text-success md:text-lg lg:text-xl">پرداخت سفارش 203040 موفق بود!</h1>
              </div>

              <div className="mb-6 flex items-center justify-center text-sm">
                <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
                  <p className="font-medium md:text-lg">جرئیات پرداخت</p>
                  <div className="flex items-center gap-x-4">
                    <p className="text-text/90">
                      شماره پیگیری : <span className="tracking-wider">24431531</span>
                    </p>
                    <p className="text-text/90">
                      تاریخ : <span> 10 / مهر / ۱۴۰۲</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="w-full">
                  <Link href="#" className="btn-primary py-3">
                    پیگیری سفارش
                  </Link>
                </div>
                <div className="w-full">
                  <Link href="/" className="btn-secondary py-3">
                    برگشت
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-[500px] rounded-lg bg-muted p-5">
              <div className="flex flex-col items-center justify-center gap-y-4">
                <div>
                  <BiXCircle className="h-20 w-20 text-red-500 dark:text-red-400" />
                </div>
                <h1 className="mb-8 text-center text-base text-red-500 dark:text-red-400 md:text-lg lg:text-xl">
                  پرداخت سفارش {payment?.orderId} {status === 'success' ? 'موفق' : 'ناموفق'} بود!
                </h1>
              </div>

              <div className="mb-10 space-y-6">
                <div className="flex gap-x-2">
                  <div>
                    <PiWarningCircleDuotone className="h-6 w-6 text-red-500 dark:text-red-400" />
                  </div>
                  <p className="text-sm leading-loose text-text/90 md:text-base">
                    سفارش شما تا
                    <span className="text-red-500 dark:text-red-400">35</span> دقیقه دیگر حذف خواهد شد. برای تکمیل نهایی سفارش، نسبت به
                    پرداخت اقدام نمایید
                  </p>
                </div>

                <div className="flex gap-x-2">
                  <div>
                    <PiWarningCircleDuotone className="h-6 w-6 text-red-500 dark:text-red-400" />
                  </div>
                  <p className="text-sm leading-loose text-text/90 md:text-base">
                    چنانچه مبلغی از حساب شما کسر شده است، تا ۲۴ ساعت آینده به حساب شما باز خواهد گشت.
                  </p>
                </div>
              </div>
              <div className="mb-6 flex items-center justify-center text-sm">
                <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
                  <p className="font-medium md:text-lg">جرئیات پرداخت</p>
                  <div className="flex items-center gap-x-4">
                    <p className="text-text/90">
                      شماره پیگیری : <span className="tracking-wider">24431531</span>
                    </p>
                    <p className="text-text/90">
                      تاریخ : <span> 10 / مهر / ۱۴۰۲</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-x-4">
                <div className="w-full">
                  <a href="#" className="btn-primary py-3">
                    پرداخت مجدد
                  </a>
                </div>
                <div className="w-full">
                  <a href="#" className="btn-secondary py-3">
                    برگشت
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default page;
