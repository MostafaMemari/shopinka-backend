import Footer from '@/components/footer';
import Header from '@/components/header';
import ProductTabs from '@/components/product/ProductTabs';
import { mockProductDetails } from '@/mock/productCarousels';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <main className="grow bg-background pb-14 pt-18 lg:pt-36">
        {children}
        {/* <NewestProductsCarousel /> */}
      </main>
    </>
  );
}
