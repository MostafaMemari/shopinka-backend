import PopularProducts from "@/components/templates/index/PopularProducts";
import ProductTabs from "@/components/ui/ProductTabs";
import { mockProductDetails } from "@/mock/productCarousels";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const product = mockProductDetails;

  return (
    <>
      {children}
      <PopularProducts />
      <ProductTabs description={product.description} specifications={product.properties} comments={product.comments} />
    </>
  );
}
