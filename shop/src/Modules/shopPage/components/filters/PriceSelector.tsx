import React from 'react';

function PriceSelector() {
  return (
    <li>
      <div>
        <p className="mb-4">محدوده قیمت</p>
        <div className="space-y-4">
          <div id="shop-price-slider"></div>
          <div className="flex items-center justify-between">
            <div className="text-primary">
              <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-min"></span>
              <span className="text-xs">تومان</span>
            </div>
            <div className="text-primary">
              <span className="text-xs font-bold xl:text-sm" id="shop-price-slider-max"></span>
              <span className="text-xs">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default PriceSelector;
