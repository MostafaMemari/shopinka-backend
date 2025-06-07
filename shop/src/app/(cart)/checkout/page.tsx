import CheckoutProgress from '@/Modules/checkout/components/CheckoutProgress';
import CheckoutPageView from '@/Modules/checkout/views/CheckoutPageView';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <CheckoutPageView />
    </>
  );
}
