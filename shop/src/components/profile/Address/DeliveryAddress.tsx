import { FaEdit } from 'react-icons/fa';

interface DeliveryAddressProps {
  address: string;
  recipient: string;
}

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({ address, recipient }) => (
  <div className="mb-8">
    <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
      <span className="h-2 w-2 rounded-full bg-primary"></span>
      آدرس تحویل سفارش
    </h2>
    <div className="block rounded-lg border p-4 shadow-base hover:border-border/50 dark:hover:border-white/10">
      <div className="mb-4 flex items-center justify-between gap-x-2 sm:mb-2">
        <p className="line-clamp-2 h-10 text-sm text-text/90 xs:text-base sm:line-clamp-1 sm:h-6">{address}</p>
      </div>
      <div className="flex items-center justify-between gap-x-2">
        <p className="line-clamp-1 text-sm text-text/60">{recipient}</p>
        <div>
          <button className="btn-primary-nobg text-sm xs:px-4 xs:py-2 md:text-base">
            <FaEdit className="h-5 w-5" />
            تغییر آدرس تحویل
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default DeliveryAddress;
