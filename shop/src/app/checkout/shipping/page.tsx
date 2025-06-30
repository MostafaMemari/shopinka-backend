import CheckoutProgress from '@/components/features/checkout/CheckoutProgress';
import CheckoutPageView from '@/components/features/checkout/CheckoutPageView';

export default function Page() {
  return (
    <>
      <CheckoutProgress currentStep="checkout" />
      <CheckoutPageView />
    </>
  );
}
