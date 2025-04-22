import Link from "next/link";
import Image from "next/image";

// Define the props interface for type safety
interface ProductCardProps {
  imageSrc: string;
  title: string;
  oldPrice?: number;
  newPrice: number;
  discount?: number;
  productLink: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, oldPrice, newPrice, discount, productLink = "/" }) => {
  const hasDiscount = !!oldPrice && !!discount;

  return (
    <div className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
      <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
        {/* Image */}
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href={productLink}>
            <Image src={imageSrc} alt="محصول" width={200} height={200} className="mx-auto w-32 rounded-lg md:w-auto" />
          </Link>
        </div>

        {/* Title */}
        <div className="mb-2">
          <Link href={productLink} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">
            {title}
          </Link>
        </div>

        {/* Prices */}
        <div className="flex flex-col">
          {hasDiscount ? (
            <>
              <div className="h-5 text-left">
                <del className="text-sm text-text/60 decoration-warning md:text-base">{oldPrice?.toLocaleString("fa-IR")}</del>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="w-9 rounded-full bg-warning py-px text-center text-sm text-white">%{discount}</p>
                </div>
                <div className="text-sm font-bold text-primary md:text-base">
                  {newPrice.toLocaleString("fa-IR")}
                  <span className="text-xs font-light md:text-sm"> تومان</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="h-5 text-left"></div>
              <div className="flex items-center justify-between">
                <div></div>
                <div className="text-sm font-bold text-primary md:text-base">
                  {newPrice.toLocaleString("fa-IR")}
                  <span className="text-xs font-light md:text-sm"> تومان</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
