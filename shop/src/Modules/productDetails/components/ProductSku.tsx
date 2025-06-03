import React from 'react';

interface ProductSkuProps {
  sku: string;
}

function ProductSku({ sku }: ProductSkuProps) {
  return (
    <div>
      {sku && (
        <div>
          <a href="#">کد کالا {sku}</a>
        </div>
      )}
    </div>
  );
}

export default ProductSku;
