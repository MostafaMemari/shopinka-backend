import React from 'react';
import { HiOutlineShieldCheck } from 'react-icons/hi';

function ProductGuaranteeBadge() {
  return (
    <div className="mb-6 flex items-center gap-x-2 rounded-lg bg-primary/10 p-4 text-sm text-primary">
      <HiOutlineShieldCheck className="h-6 w-6" />
      تضمین سلامت فیزیکی و اصالت کالا
    </div>
  );
}

export default ProductGuaranteeBadge;
