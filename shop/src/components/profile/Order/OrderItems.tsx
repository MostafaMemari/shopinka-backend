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
      <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <span className="h-2 w-2 rounded-full bg-primary-500"></span>
        اقلام سفارش
        <span className="text-sm text-gray-600 dark:text-gray-400">({itemCount} کالا)</span>
      </h2>

      <ul className="flex flex-col gap-4">
        {items.map((item) => {
          const variantAttributes = item.productVariant?.attributeValues;
          const primaryAttribute = variantAttributes?.[0] || null;
          const product = item?.product || item?.productVariant?.product;
          const productId = product?.id || '';
          const productName = product?.name || '';
          const productSlug = product?.slug || '';
          const productImageUrl =
            item?.product?.mainImage?.fileUrl || item?.productVariant?.product?.mainImage?.fileUrl || '/images/no-image.webp';

          return (
            <li key={item.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Link href={`/product/${productSlug}`} target="_blank" className="w-20 h-20 flex-shrink-0 relative">
                    <Image
                      alt={productName}
                      src={productImageUrl}
                      fill
                      className="rounded-lg object-cover"
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  </Link>

                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/product/${productSlug}`}
                      target="_blank"
                      className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition"
                    >
                      {productName}
                    </Link>

                    {primaryAttribute && (
                      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <span
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: primaryAttribute.colorCode || 'transparent' }}
                        />
                        <span>{primaryAttribute.name}</span>
                      </div>
                    )}

                    <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1">
                      {formatPrice(item.price)} <span className="text-xs font-normal mr-1">تومان</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-start sm:justify-center">
                  <div className="flex h-9 min-w-[90px] items-center justify-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 px-3 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                    <span>تعداد:</span>
                    <span className="font-bold">{item.quantity}</span>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderItems;
