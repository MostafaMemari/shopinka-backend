'use client';

import MobileLogo from '../ui/Logo/MobileLogo';
import MobileMenu from './MobileMenu';
import { categories } from '@/mock/categories';

const HeaderMobile = () => {
  return (
    <div className="lg:hidden">
      <div className="fixed top-3 right-3 left-3 rounded-2xl z-50 bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-center py-3 px-4">
          <MobileMenu categories={categories} />
          <MobileLogo />
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
