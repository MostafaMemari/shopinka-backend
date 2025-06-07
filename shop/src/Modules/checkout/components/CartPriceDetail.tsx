export default function CartPriceDetail() {
  return (
    <div className="col-span-12 md:col-span-4">
      {/* Desktop */}
      <div className="hidden rounded-lg bg-muted p-4 md:block">
        <div className="mb-2 divide-y">
          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="text-sm text-text/90 lg:text-base">قیمت کالا ها (2)</div>
            <div className="text-sm text-primary lg:text-base">
              <span className="font-bold">2,400,000</span>
              <span className="text-xs lg:text-sm"> تومان</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="text-sm text-text/90 lg:text-base">تخفیف</div>
            <div className="text-sm font-medium text-red-500 dark:text-red-400 lg:text-base">
              <span className="font-bold">1,220,000</span>
              <span className="text-xs lg:text-sm"> تومان</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="text-sm text-text/90 lg:text-base">هزینه ارسال</div>
            <div className="text-sm text-sky-500 dark:text-sky-400 lg:text-base">
              <span className="font-bold"> رایگان </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-x-2 py-6">
            <div className="text-sm text-text/90 lg:text-base">مبلغ قابل پرداخت</div>
            <div className="text-sm text-primary lg:text-base">
              <span className="font-bold">2,400,000</span>
              <span className="text-xs lg:text-sm"> تومان</span>
            </div>
          </div>
        </div>
        <div>
          <a href="./checkout-payment.html" className="btn-primary py-3">
            ادامه فرایند خرید
          </a>
        </div>
      </div>
      {/* Mobile */}
      <div className="fixed inset-x-0 bottom-0 flex items-center gap-x-6 rounded-t-2xl bg-muted p-4 md:hidden">
        <a className="btn-primary grow py-3" href="./checkout-payment.html">
          ادامه فرایند خرید
        </a>
        <div className="flex flex-col items-center gap-y-1">
          <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
          <div className="text-text/90">
            <span className="font-bold">1,200,000</span>
            <span className="text-sm"> تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}
