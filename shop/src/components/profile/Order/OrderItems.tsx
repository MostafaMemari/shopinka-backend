import { OrderProductItem } from '@/types/orderType';
import { formatPrice } from '@/utils/formatter';
import Image from 'next/image';
import Link from 'next/link';

interface OrderItemsProps {
  items: OrderProductItem[];
  itemCount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, itemCount }) => {
  return (
    <div className="mb-8">
      <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
        <span className="h-2 w-2 rounded-full bg-primary"></span>
        اقلام سفارش
        <span className="text-sm text-text/60"> ( {itemCount} کالا ) </span>
      </h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id}>
            <div className="py-4 ">
              <div className="grid grid-cols-2 items-center justify-start gap-2 xs:grid-cols-3 xs:gap-6 sm:grid-cols-4 xl:grid-cols-6">
                <div className="row-span-2 min-w-fit xs:mx-auto">
                  <Link href="/product-detail">
                    <Image
                      alt={item.product.name}
                      className="w-25 rounded-lg sm:w-28"
                      src={item.product.mainImage?.fileUrl || '/images/no-image.webp'}
                      width={50}
                      height={50}
                    />
                  </Link>
                </div>
                <div className="row-span-2 space-y-4 xs:col-span-2 sm:col-span-3 xl:col-span-5">
                  <Link href={`/product/${item.id}`} className="line-clamp-2 text-sm md:text-base">
                    {item.product.name}
                  </Link>
                  <div className="flex items-center gap-x-2">
                    {/* <span className="h-4 w-4 rounded-full" style={{ background: item.attributeValues }}></span>
                  <span className="text-xs text-text/90 xs:text-sm">{item.variant.name}</span> */}
                  </div>
                  <div className="text-primary">
                    <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(item.price)}</span>
                    <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 xs:justify-center">
                  <div className="flex h-10 w-24 items-center justify-center gap-x-3 rounded-lg border px-4 py-1 sm:w-28">
                    <div className="flex h-5 w-5 select-none items-center justify-center text-sm font-medium sm:h-6 sm:w-6 sm:text-lg">
                      {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default OrderItems;
