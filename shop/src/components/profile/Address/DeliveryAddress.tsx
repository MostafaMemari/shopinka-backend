import { AddressItem } from '@/types/addressType';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface DeliveryAddressProps {
  address: AddressItem;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address }) => {
  const fullAddress = [
    address.province,
    address.city,
    address.streetAndAlley,
    address.plate ? `پلاک ${address.plate}` : null,
    address.unit ? `واحد ${address.unit}` : null,
  ]
    .filter(Boolean)
    .join('، ');

  return (
    <div className="mb-8">
      <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <FaMapMarkerAlt className="h-5 w-5 text-primary-500" />
        آدرس تحویل سفارش
      </h2>
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col gap-2">
          <p className="text-sm md:text-base text-gray-800 dark:text-gray-200">{fullAddress}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">تحویل‌گیرنده: {address.fullName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">کدپستی: {address.postalCode}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
