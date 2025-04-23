"use client";

import { useState } from "react";
import MainImage from "./MainImage";
import GalleryImage from "./GalleryImage";
import GalleryModal from "./GalleryModal";

type GalleryItem = {
  src: string;
  alt: string;
  isBlurred?: boolean;
};

type ProductGalleryProps = {
  images: GalleryItem[];
  title?: string;
};

export default function ProductGallery({ images, title = "تصاویر محصول" }: ProductGalleryProps) {
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

        <div className="flex items-center justify-start gap-x-2 overflow-x-auto pb-2">
          {displayedImages.map((image, index) => (
            <div key={index} onClick={() => setIsModalOpen(true)} className="shrink-0 cursor-pointer">
              <GalleryImage src={image.src} alt={image.alt} isBlurred={false} size="md" />
            </div>
          ))}
          {blurredImage && (
            <div onClick={() => setIsModalOpen(true)} className="shrink-0">
              <GalleryImage src={blurredImage.src} alt={blurredImage.alt} isBlurred={true} size="md" />
            </div>
          )}
        </div>
      </div>

      <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} images={images} title={title} />
    </>
  );
}
