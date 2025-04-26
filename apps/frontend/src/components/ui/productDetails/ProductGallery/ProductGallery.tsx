"use client";

import { useState } from "react";
import MainImage from "./MainImage";
import GalleryImage from "./GalleryImage";
import GalleryModal from "./GalleryModal";
import { IProductThumbnail } from "@/lib/types/products";

type ProductGalleryProps = {
  images: IProductThumbnail[];
  title?: string;
};

export default function ProductGallery({
  images,
  title = "تصاویر محصول",
}: ProductGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedImages = images.slice(0, 3);
  const hasMoreImages = images.length > 3;
  const blurredImage = hasMoreImages ? images[3] : null;

  return (
    <>
      <div className="space-y-4">
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <MainImage src={images[0].src} alt={images[0].alt} />
        </div>

        <div className="flex items-center justify-center gap-x-2">
          {displayedImages.map((image, index) => (
            <div key={index} onClick={() => setIsModalOpen(true)}>
              <GalleryImage src={image.src} alt={image.alt} isBlurred={false} />
            </div>
          ))}
          {blurredImage && (
            <div onClick={() => setIsModalOpen(true)} className="shrink-0">
              <GalleryImage
                src={blurredImage.src}
                alt={blurredImage.alt}
                isBlurred={true}
              />
            </div>
          )}
        </div>
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        title={title}
      />
    </>
  );
}
