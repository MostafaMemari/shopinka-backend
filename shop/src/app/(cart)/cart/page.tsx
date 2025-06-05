import { getCart } from '@/Modules/cart/services/cart.api';
import CartPageView from '@/Modules/cart/views/CartPageView';

export async function Page() {
  const cartItems = (await getCart()).items;
  return (
    <>
      <CartPageView cartItems={cartItems} />
    </>
  );
}

export default Page;
