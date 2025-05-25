'use client';

import { useState } from 'react';
import MainImage from './MainImage';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import { Image } from '@/shared/types/imageType';

type ProductGalleryProps = {
  mainImage: Image | null;
  galleryImages: Image[];
  title?: string;
};

export default function ProductGallery({ mainImage, galleryImages, title = 'تصاویر محصول' }: ProductGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedImages = galleryImages.slice(0, 3);
  const hasMoreImages = galleryImages.length > 3;
  const blurredImage = hasMoreImages ? galleryImages[3] : null;

  return (
    <>
      <div className="space-y-4">
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          {mainImage && (
            <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
              <MainImage src={mainImage.fileUrl} alt={mainImage.title} />
            </div>
          )}{' '}
        </div>

        {galleryImages.length > 0 && (
          <div className="flex items-center justify-center gap-x-2">
            {displayedImages.map((image, index) => (
              <div key={index} onClick={() => setIsModalOpen(true)}>
                <GalleryImage src={image.fileUrl} alt={image.title} isBlurred={false} />
              </div>
            ))}
            {blurredImage && (
              <div onClick={() => setIsModalOpen(true)} className="shrink-0">
                <GalleryImage src={blurredImage.fileUrl} alt={blurredImage.title} isBlurred={true} />
              </div>
            )}
          </div>
        )}
      </div>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={mainImage ? [mainImage, ...galleryImages] : galleryImages}
        title={title}
      />
    </>
  );
}
