import CheckoutProgress from '@/modules/checkout/components/CheckoutProgress';
import CheckoutPageView from '@/modules/checkout/views/CheckoutPageView';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <CheckoutPageView />
    </>
  );
}
