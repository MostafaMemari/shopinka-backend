import { HiOutlineCreditCard, HiOutlineCheck } from 'react-icons/hi';
import { TbTruckDelivery } from 'react-icons/tb';

export default function Breadcrumb() {
  return (
    <div className="col-span-12 rounded-lg bg-muted">
      <ol className="grid grid-cols-3 overflow-hidden rounded-lg">
        <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
          <HiOutlineCheck className="h-6 w-6 md:h-8 md:w-8" />
          <p className="leading-none">سبد خرید</p>
        </li>
        <li className="flex flex-col items-center justify-center gap-2 bg-primary/10 p-4 text-xs text-primary sm:text-sm md:text-base">
          <TbTruckDelivery className="h-6 w-6 md:h-8 md:w-8" />
          <p className="leading-none">شیوه ارسال</p>
        </li>
        <li className="flex flex-col items-center justify-center gap-2 p-4 text-xs text-primary opacity-50 sm:text-sm md:text-base">
          <HiOutlineCreditCard className="h-6 w-6 md:h-8 md:w-8" />
          <p className="leading-none">پرداخت</p>
        </li>
      </ol>
    </div>
  );
}
