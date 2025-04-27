import { useState } from "react";

export const useProductActions = (productId: string) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleAddToFavorite = () => {
    console.log(`افزودن محصول ${productId} به علاقه‌مندی`);
  };

  const handleAddToCompare = () => {
    console.log(`افزودن محصول ${productId} به مقایسه`);
  };

  const handleShare = () => {
    setShowShareMenu((prev) => !prev);
    console.log(`اشتراک‌گذاری محصول ${productId}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log(`لینک محصول ${productId} کپی شد`);
    setIsCopied(true);
    setShowShareMenu(false);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return {
    showShareMenu,
    isCopied,
    handleAddToFavorite,
    handleAddToCompare,
    handleShare,
    handleCopyLink,
  };
};
