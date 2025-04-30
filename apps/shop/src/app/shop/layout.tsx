import Footer from "@/components/footer";
import Header from "@/components/header";
// import CarouselProduct from "@/components/Carousel/CarouselProduct";
// import ProductTabs from "@/components/ProductTabs";
// import { mockProductDetails, popularProducts } from "@/mock/productCarousels";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  // const product = mockProductDetails;

  return (
    <>
      <Header />

      <div className="fixed inset-x-0 top-1/3 mx-auto h-1/3 w-1/4 bg-primary/50 blur-[200px]"></div>
      <main className="grow bg-background pb-14 pt-36 xs:pt-36">
        <section className="mb-8">
          <div className="container relative">{children}</div>
        </section>
      </main>

      <Footer />
    </>
  );
}
