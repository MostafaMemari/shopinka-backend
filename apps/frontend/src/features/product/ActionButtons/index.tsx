import FavoriteButton from "./FavoriteButton";
import CompareButton from "./CompareButton";
import ShareButton from "./ShareButton";

type Props = {
  productId: string;
};

export default function ProductActions({ productId }: Props) {
  const handleAddToFavorite = () => {
    console.log(`افزودن محصول ${productId} به علاقه‌مندی`);
  };

  const handleAddToCompare = () => {
    console.log(`افزودن محصول ${productId} به مقایسه`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log(`لینک محصول ${productId} کپی شد`);
  };

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block py-2">
        <div className="flex items-center gap-x-4">
          <FavoriteButton onAddToFavorite={handleAddToFavorite} />
          <CompareButton onAddToCompare={handleAddToCompare} />
          <ShareButton productId={productId} onCopyLink={handleCopyLink} />
        </div>
      </div>

      {/* Mobile  */}
      <div className="lg:hidden absolute left-4 top-4 z-15">
        <div className="flex items-center gap-x-4">
          <FavoriteButton onAddToFavorite={handleAddToFavorite} />
          <CompareButton onAddToCompare={handleAddToCompare} />
          <ShareButton productId={productId} onCopyLink={handleCopyLink} isMobile />
        </div>
      </div>
    </>
  );
}
