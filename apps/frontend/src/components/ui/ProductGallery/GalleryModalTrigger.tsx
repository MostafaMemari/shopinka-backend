"use client";

import GalleryImage from "./GalleryImage";

type GalleryModalTriggerProps = {
  src: string;
  alt: string;
  isBlurred?: boolean;
  modalTarget: string;
};

export default function GalleryModalTrigger({ src, alt, isBlurred = false, modalTarget }: GalleryModalTriggerProps) {
  const handleClick = () => {
    // فرض می‌کنیم از Flowbite یا کتابخونه مشابه برای مدال استفاده می‌کنی
    const modal = document.getElementById(modalTarget);
    if (modal) {
      // @ts-ignore
      modal.show(); // متد show برای باز کردن مدال (بستگی به کتابخونه داره)
    }
  };

  return (
    <button
      type="button"
      data-modal-target={modalTarget}
      data-modal-toggle={modalTarget}
      className="cursor-pointer rounded-lg border p-1"
      onClick={handleClick}
    >
      <GalleryImage src={src} alt={alt} isBlurred={isBlurred} />
    </button>
  );
}
