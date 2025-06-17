'use client'; // چون این یه client component هست

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineShare, HiOutlineShoppingCart } from 'react-icons/hi';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import FavoriteProductAction from './ActionButtons/FavoriteProductAction';

interface MobileHeaderProps {
  productId: number;
}

const MobileHeader = ({ productId }: MobileHeaderProps) => {
  const router = useRouter();
  const { cart: cartItems } = useCart();
  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleShare = () => {
    console.log(`Share product with ID: ${productId}`);
  };

  const handleLike = () => {
    console.log(`Like product with ID: ${productId}`);
  };

  const handleCart = () => {
    router.push('/checkout/cart');
  };

  return (
    <div className="fixed top-3 right-0 z-50 lg:hidden w-full">
      <div className="flex items-center justify-between py-2 px-4">
        <div className="flex gap-2">
          <button onClick={handleBack} className="bg-white p-3 rounded-lg shadow-md cursor-pointer" aria-label="Back">
            <IoIosArrowBack size={22} className="transform rotate-180" />
          </button>

          <button onClick={handleHome} className="bg-white p-3 rounded-lg shadow-md cursor-pointer" aria-label="Home">
            <RiHome3Line size={22} />
          </button>
        </div>

        <div className="flex bg-white items-center rounded-lg shadow-md cursor-pointer">
          <button onClick={handleShare} className="p-3 cursor-pointer" aria-label="Share">
            <HiOutlineShare size={22} />
          </button>

          <FavoriteProductAction productId={productId} className="p-3 cursor-pointer" />

          <button onClick={handleCart} className="p-3 cursor-pointer relative" aria-label="Add to Cart">
            <HiOutlineShoppingCart size={22} />
            {totalQuantity > 0 && (
              <span
                className={`absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-md bg-primary-btn text-sm font-bold text-white border border-white dark:border-gray-800`}
              >
                {totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
