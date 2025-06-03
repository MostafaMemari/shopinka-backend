'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MainImage from './MainImage';
import GalleryImage from './GalleryImage';
import GalleryModal from './GalleryModal';
import { ProductGalleriesType } from '../../types/productGalleriesType';

interface ProductGalleryProps {
  product: ProductGalleriesType;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { selectedVariant } = useSelector((state: RootState) => state.product);

  const mainImage = product.type === 'VARIABLE' && selectedVariant?.mainImage ? selectedVariant.mainImage : product.mainImage;

  const displayedImages = product.galleryImages?.slice(0, 3);
  const hasMoreImages = product.galleryImages?.length > 3;
  const blurredImage = hasMoreImages ? product.galleryImages[3] : null;

  const modalImages = mainImage ? [mainImage, ...product.galleryImages] : product.galleryImages;

  return (
    <>
      <div className="space-y-4">
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          {mainImage && <MainImage src={mainImage.fileUrl} alt={mainImage.title ?? product.name} />}
        </div>

        {product.galleryImages?.length > 0 && (
          <div className="flex items-center justify-center gap-x-2">
            {displayedImages.map((image, index) => (
              <div key={index} onClick={() => setIsModalOpen(true)}>
                <GalleryImage src={image.fileUrl} alt={image.title ?? product.name} isBlurred={false} />
              </div>
            ))}
            {blurredImage && (
              <div onClick={() => setIsModalOpen(true)} className="shrink-0">
                <GalleryImage src={blurredImage.fileUrl} alt={blurredImage.title ?? product.name} isBlurred={true} />
              </div>
            )}
          </div>
        )}
      </div>

      <GalleryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} images={modalImages} title={product.name} />
    </>
  );
}
