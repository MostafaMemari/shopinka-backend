import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header/Header";
import PopularProducts from "@/components/templates/index/PopularProducts";
import ProductTabs from "@/features/product/ProductTabs";
import { mockProductDetails } from "@/mock/productCarousels";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        {children}
        <PopularProducts />
        <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
      </main>

      <Footer />
    </>
  );
}
