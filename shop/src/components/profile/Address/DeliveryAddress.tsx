import { AddressItem } from '@/types/addressType';
import { FaEdit } from 'react-icons/fa';

interface DeliveryAddressProps {
  address: AddressItem;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address }) => (
  <div className="mb-8">
    <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
      <span className="h-2 w-2 rounded-full bg-primary"></span>
      آدرس تحویل سفارش
    </h2>
    <div className="block rounded-lg border p-4 shadow-base hover:border-border/50 dark:hover:border-white/10">
      <div className="mb-4 flex flex-col items-start gap-2 sm:mb-2">
        <p className="line-clamp-2 h-10 text-sm text-text/90 xs:text-base sm:line-clamp-1 sm:h-6">{`${address.province} ، ${address.city} ، ${address.plate} ، خیابان ${address.streetAndAlley}`}</p>
        <p className="line-clamp-2 h-10 text-xs text-text/70 xs:text-base sm:line-clamp-1 sm:h-6">{`تحویل گیرنده : ${address.fullName}`}</p>
        <p className="line-clamp-2 h-10 text-xs text-text/70 xs:text-base sm:line-clamp-1 sm:h-6">{`کدپستی : ${address.postalCode}`}</p>
      </div>
    </div>
  </div>
);

export default DeliveryAddress;
