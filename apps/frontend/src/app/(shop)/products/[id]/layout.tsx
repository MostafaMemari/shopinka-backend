import Footer from "@/components/modules/Footer";
import Header from "@/components/modules/Header/Header";
import PopularProducts from "@/components/templates/index/PopularProducts";
import ProductTabs from "@/components/ui/ProductTabs";
import { mockProductDetails } from "@/mock/productCarousels";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      <Header />

      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        {children}
        <PopularProducts />
        <ProductTabs
          description={product.description}
          specifications={product.properties}
          comments={product.comments}
        />
      </main>

      <Footer />
    </>
  );
}
