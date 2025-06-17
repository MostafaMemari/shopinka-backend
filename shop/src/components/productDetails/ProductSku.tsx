import Link from 'next/link';
import React from 'react';

interface ProductSkuProps {
  sku: string;
}

function ProductSku({ sku }: ProductSkuProps) {
  return (
    <div>
      {sku && (
        <div>
          <Link href="#">کد کالا {sku}</Link>
        </div>
      )}
    </div>
  );
}

export default ProductSku;
