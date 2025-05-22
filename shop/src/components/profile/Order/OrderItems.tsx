import Link from 'next/link';

interface OrderItem {
  id: string;
  image: string;
  title: string;
  variant: { color: string; name: string };
  discount?: string;
  quantity: number;
  price: string;
  originalPrice?: string;
}

interface OrderItemsProps {
  items: OrderItem[];
  itemCount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, itemCount }) => (
  <div className="mb-8">
    <h2 className="mb-8 flex items-center gap-x-4 text-lg text-text/90">
      <span className="h-2 w-2 rounded-full bg-primary"></span>
      اقلام سفارش
      <span className="text-sm text-text/60"> ( {itemCount} کالا ) </span>
    </h2>
    <ul className="divide-y">
      {items.map((item) => (
        <li key={item.id}>
          <div className="py-4 sm:py-6">
            <div className="grid grid-cols-2 items-center justify-start gap-2 xs:grid-cols-3 xs:gap-6 sm:grid-cols-4 xl:grid-cols-6">
              <div className="row-span-2 min-w-fit xs:mx-auto">
                <Link href="/product-detail">
                  <img alt={item.title} className="w-25 rounded-lg sm:w-28" src={item.image} />
                </Link>
              </div>
              <div className="row-span-2 space-y-4 xs:col-span-2 sm:col-span-3 xl:col-span-5">
                <Link href="/product-detail" className="line-clamp-2 text-sm md:text-base">
                  {item.title}
                </Link>
                <div className="flex items-center gap-x-2">
                  <span className="h-4 w-4 rounded-full" style={{ background: item.variant.color }}></span>
                  <span className="text-xs text-text/90 xs:text-sm">{item.variant.name}</span>
                </div>
                {item.discount && (
                  <div className="flex flex-col items-start gap-x-2 text-red-500 dark:text-red-400 xs:flex-row xs:items-center">
                    <div className="text-xs xs:text-sm">تخفیف</div>
                    <div className="text-red-500 dark:text-red-400">
                      <span className="text-sm font-bold">{item.discount}</span>
                      <span className="text-xs xs:text-sm">تومان</span>
                    </div>
                  </div>
                )}
                {item.originalPrice && (
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm text-text/90 xs:text-base">قیمت</div>
                    <div className="text-sm text-text/90 xs:text-base">{item.originalPrice} تومان</div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-x-2 xs:justify-center">
                <div className="flex h-10 w-24 items-center justify-center gap-x-3 rounded-lg border px-4 py-1 sm:w-28">
                  <div className="flex h-5 w-5 select-none items-center justify-center text-sm font-medium sm:h-6 sm:w-6 sm:text-lg">
                    {item.quantity}
                  </div>
                </div>
              </div>
              <div className="row-span-2 xs:col-span-2 sm:col-span-3 xl:col-span-5">
                <div className="text-primary xs:col-span-2 sm:col-span-3 lg:text-lg xl:col-span-5">
                  <span className="font-bold">{item.price}</span>
                  <span className="text-sm lg:text-base">تومان</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default OrderItems;
