'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { RiHome3Line } from 'react-icons/ri';
import { HiOutlineShare } from 'react-icons/hi';
import FavoriteProductAction from './ActionButtons/FavoriteProductAction';
import SkeletonLoader from '../ui/SkeletonLoader';
import CartIconTotalQuantity from '../cart/CartIconTotalQuantity';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

interface MobileHeaderProps {
  productId: number;
}

const MobileHeader = ({ productId }: MobileHeaderProps) => {
  const { isLogin } = useAuth();
  const router = useRouter();
  const isMounted = useIsMounted();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleShare = () => {
    console.log(`Share product with ID: ${productId}`);
  };

  const handleCart = () => {
    router.push('/checkout/cart');
  };

  return (
    <div className="fixed top-3 right-0 z-50 lg:hidden w-full">
      <div className="flex items-center justify-between py-2 px-4">
        {!isMounted ? (
          <>
            <div className="flex gap-2">
              <SkeletonLoader width="3rem" height="3rem" className="rounded-lg" />
              <SkeletonLoader width="3rem" height="3rem" className="rounded-lg" />
            </div>

            <SkeletonLoader width="8rem" height="3rem" className="rounded-lg" />
          </>
        ) : (
          <>
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

              <button onClick={handleCart} className="p-3 cursor-pointer" aria-label="Add to Cart">
                <CartIconTotalQuantity isLogin={isLogin} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
