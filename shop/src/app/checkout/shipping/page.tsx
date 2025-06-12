import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import CheckoutPageView from '@/components/checkout/CheckoutPageView';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <CheckoutPageView />
    </>
  );
}
