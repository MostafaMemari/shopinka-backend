'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MainImage from './MainImage';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import { Image } from '@/shared/types/imageType';

interface ProductGalleryProps {
  productType: string | null;
  mainImageProduct: Image | null;
  galleryImagesProduct: Image[] | [];
  productName: string;
}

export default function ProductGallery({ productType, mainImageProduct, galleryImagesProduct, productName }: ProductGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedVariant } = useSelector((state: RootState) => state.product);

  const mainImage = productType === 'VARIABLE' && selectedVariant?.mainImage ? selectedVariant.mainImage : mainImageProduct;

  const displayedImages = galleryImagesProduct?.slice(0, 3);
  const hasMoreImages = galleryImagesProduct?.length > 3;
  const blurredImage = hasMoreImages ? galleryImagesProduct[3] : null;

  const modalImages = mainImage ? [mainImage, ...galleryImagesProduct] : galleryImagesProduct;

  return (
    <>
      <div className="space-y-4">
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          {mainImage && <MainImage src={mainImage.fileUrl} alt={mainImage.title ?? productName} />}
        </div>

        {galleryImagesProduct?.length > 0 && (
          <div className="flex items-center justify-center gap-x-2">
            {displayedImages.map((image, index) => (
              <div key={index} onClick={() => setIsModalOpen(true)}>
                <GalleryImage src={image.fileUrl} alt={image.title ?? productName} isBlurred={false} />
              </div>
            ))}
            {blurredImage && (
              <div onClick={() => setIsModalOpen(true)} className="shrink-0">
                <GalleryImage src={blurredImage.fileUrl} alt={blurredImage.title ?? productName} isBlurred={true} />
              </div>
            )}
          </div>
        )}
      </div>

      <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} images={modalImages} title={productName} />
    </>
  );
}
