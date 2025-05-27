import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import ProductTabs from '@/Modules/product/components/ProductTabs';
import { mockProductDetails, popularProducts } from '@/mock/productCarousels';
import NewestProductsCarousel from '@/Modules/home/views/newestProductsCarousel';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        {children}
        <div className="w-full max-w-screen-xl mx-auto px-4 mt-8">
          <NewestProductsCarousel />
        </div>
        <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
      </main>

      <Footer />
    </>
  );
}
