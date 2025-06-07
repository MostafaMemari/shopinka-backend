import Image from 'next/image';

export default function DeliverySection() {
  return (
    <div>
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h2 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">شیوه ارسال</h2>
      </div>
      <fieldset className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <legend className="sr-only">Delivery</legend>
        <div>
          <input type="radio" name="delivery" value="delivery-1" id="delivery-1" className="peer hidden" />
          <label
            htmlFor="delivery-1"
            className="relative block h-[116px] cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
          >
            <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
              <p className="line-clamp-1 text-sm text-text/90 xs:text-base">تیپاکس</p>
              <Image src="/images/others/tipax.png" alt="تیپاکس" className="w-25" width={100} height={100} />
            </div>
            <div className="mb-1 text-primary">
              <span>60,000</span>
              <span className="text-sm"> تومان</span>
            </div>
            <div className="text-sm text-primary">
              <span> رایگان بالای 500,000 </span>
            </div>
          </label>
        </div>
        <div>
          <input type="radio" name="delivery" value="delivery-2" id="delivery-2" className="peer hidden" />
          <label
            htmlFor="delivery-2"
            className="relative block h-[116px] cursor-pointer rounded-lg border p-4 shadow-base peer-checked:border-emerald-500 hover:border-border/50 dark:peer-checked:border-emerald-400 dark:hover:border-white/10"
          >
            <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
              <p className="line-clamp-1 text-sm text-text/90 xs:text-base">تیپاکس</p>
              <Image src="/images/others/tipax.png" alt="تیپاکس" className="w-25" width={100} height={100} />
            </div>
            <div className="text-primary">
              <span className="text-sm">پرداخت در مقصد</span>
            </div>
          </label>
        </div>
      </fieldset>
    </div>
  );
}
