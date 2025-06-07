import AddressSection from '../components/AddressSection';
import Breadcrumb from '../components/Breadcrumb';
import CartPriceDetail from '../components/CartPriceDetail';
import DeliverySection from '../components/DeliverySection';

export default function CheckoutShippingView() {
  return (
    <main className="grow">
      <div className="container">
        <div className="grid grid-cols-12 gap-2 lg:gap-6">
          <Breadcrumb />
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-lg bg-muted p-4">
              <AddressSection />
              <DeliverySection />
            </div>
          </div>
          <CartPriceDetail />
        </div>
      </div>
    </main>
  );
}
