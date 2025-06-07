import AddressSection from '@/Modules/checkout/components/AddressSection';
import CartPriceDetail from '@/Modules/checkout/components/CartPriceDetail';
import CheckoutProgress from '@/Modules/checkout/components/CheckoutProgress';
import DeliverySection from '@/Modules/checkout/components/DeliverySection';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <div className="col-span-12 md:col-span-8">
        <div className="rounded-lg bg-muted p-4">
          <AddressSection />
          <DeliverySection />
        </div>
      </div>
      <CartPriceDetail />
    </>
  );
}
