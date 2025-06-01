import { AttributeValues } from '@/shared/types/attributeType';
import React from 'react';

interface CartItemAttributesProps {
  count: number;
  type: 'SIMPLE' | 'VARIABLE';
  attributes: AttributeValues[];
}

function CartItemAttributes({ count, type, attributes }: CartItemAttributesProps) {
  return (
    <>
      <div>تعداد: {count}</div>
      {type === 'VARIABLE' && attributes.length > 0 && (
        <>
          <div className="h-3 w-px rounded-full bg-background"></div>
          <div className="flex flex-wrap items-center gap-x-2">
            {attributes.map((attr: AttributeValues, index: number) => (
              <div key={attr.id || index} className="flex items-center gap-x-2">
                {attr.colorCode ? (
                  <>
                    <span className="h-4 w-4 rounded-full" style={{ background: attr.colorCode || '#000' }}></span>
                    <span>رنگ: {attr.name}</span>
                  </>
                ) : attr.buttonLabel ? (
                  <span>{attr.buttonLabel}</span>
                ) : (
                  <span>{attr.name}</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default CartItemAttributes;
