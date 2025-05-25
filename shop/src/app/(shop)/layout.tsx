import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';
import CarouselProduct from '@/Modules/product/components/ProductCarousel';
import ProductTabs from '@/Modules/product/components/ProductTabs';
import { mockProductDetails, popularProducts } from '@/mock/productCarousels';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        {children}
        <CarouselProduct title="پرفروشترین محصولات" products={popularProducts} viewAllLink="/" />
        <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
      </main>

      <Footer />
    </>
  );
}
