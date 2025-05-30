import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';
import ProductTabs from '@/Modules/product/components/ProductTabs';
import { mockProductDetails } from '@/mock/productCarousels';
import NewestProductsCarousel from '@/Modules/home/views/newestProductsCarousel';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        {children}
        <NewestProductsCarousel />
        <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
      </main>

      <Footer />
    </>
  );
}
