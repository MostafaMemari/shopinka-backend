import PopularProducts from "@/components/templates/index/PopularProducts";
import ProductComments from "@/components/ui/ProductComments";
import ProductDescription from "@/components/ui/ProductDescription";
import ProductSpecifications from "@/components/ui/ProductSpecifications";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="container">
        {children}
        <PopularProducts />
        <div className="rounded-lg bg-muted p-4 shadow-base">
          <div className="mb-6">
            <ul className="-mb-px flex justify-between gap-x-2 border-b text-center text-sm font-medium xs:justify-start xs:gap-x-4 xs:text-base">
              <li>
                <a
                  href="#description"
                  className="inline-block rounded-t-lg border-b-2 border-transparent px-2 pb-2 hover: text-text/90 dark:hover:text-zinc-300"
                >
                  معرفی
                </a>
              </li>
              <li>
                <a
                  href="#specs"
                  className="inline-block rounded-t-lg border-b-2 border-transparent px-2 pb-2 hover: text-text/90 dark:hover:text-zinc-300"
                >
                  مشخصات
                </a>
              </li>
              <li>
                <a
                  href="#comments"
                  className="relative inline-block rounded-t-lg border-b-2 border-transparent px-2 pb-2 hover: text-text/90 dark:hover:text-zinc-300"
                >
                  دیدگاه ها
                  <span className="absolute -left-5 -top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600 xs:text-sm">
                    2
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-16 divide-y">
            <ProductDescription />

            <ProductSpecifications />

            <ProductComments />
          </div>
        </div>
      </div>
    </>
  );
}
