import Footer from '@/components/footer';
import Header from '@/components/header';
import ProductTabs from '@/components/product/ProductTabs';
import { mockProductDetails } from '@/mock/productCarousels';
import NewestProductsCarousel from '@/modules/home/views/newestProductsCarousel';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-18 lg:pt-36">
        {children}
        <NewestProductsCarousel />
        <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
      </main>

      <Footer />
    </>
  );
}
