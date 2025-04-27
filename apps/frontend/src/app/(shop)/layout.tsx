import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CarouselProduct from "@/components/ui/Carousel/CarouselProduct";
import ProductTabs from "@/features/product/ProductTabs";
import { mockProductDetails, popularProducts } from "@/mock/productCarousels";

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
