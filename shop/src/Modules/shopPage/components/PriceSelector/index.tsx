'use client';

import { useEffect, useRef } from 'react';
import { useQueryState } from 'nuqs';
import noUiSlider, { API } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './PriceSelector.css';

const MIN_PRICE = 0;
const MAX_PRICE = 100000;
const STEP = 5000;

function PriceSelector() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderInstance = useRef<API | null>(null);

  const [minPrice, setMinPrice] = useQueryState<number>('minPrice', {
    parse: (value) => (value ? Number(value) : MIN_PRICE),
    serialize: (value) => String(value),
    defaultValue: MIN_PRICE,
  });
  const [maxPrice, setMaxPrice] = useQueryState<number>('maxPrice', {
    parse: (value) => (value ? Number(value) : MAX_PRICE),
    serialize: (value) => String(value),
    defaultValue: MAX_PRICE,
  });

  useEffect(() => {
    if (!sliderRef.current) return;

    if (!sliderInstance.current) {
      sliderInstance.current = noUiSlider.create(sliderRef.current, {
        start: [minPrice, maxPrice],
        connect: true,
        range: {
          min: MIN_PRICE,
          max: MAX_PRICE,
        },
        step: STEP,
      });

      const minElement = document.getElementById('shop-price-slider-min');
      const maxElement = document.getElementById('shop-price-slider-max');

      if (minElement) minElement.textContent = formatPrice(minPrice);
      if (maxElement) maxElement.textContent = formatPrice(maxPrice);

      sliderInstance.current.on('update', (values: (string | number)[]) => {
        const [min, max] = values;
        if (minElement) minElement.textContent = formatPrice(Number(min));
        if (maxElement) maxElement.textContent = formatPrice(Number(max));
      });

      sliderInstance.current.on('change', (values: (string | number)[]) => {
        const [min, max] = values;
        const newMin = Number(min);
        const newMax = Number(max);
        setMinPrice(newMin);
        setMaxPrice(newMax);
      });
    }

    sliderInstance.current.set([minPrice, maxPrice]);

    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
        sliderInstance.current = null;
      }
    };
  }, [minPrice, maxPrice, setMinPrice, setMaxPrice]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="p-4">
      <h3 className="text-base font-medium mb-2">محدوده قیمت</h3>
      <div className="space-y-2">
        <div ref={sliderRef} id="shop-price-slider"></div>
        <div className="flex justify-between text-sm text-gray-600 mt-3">
          <div>
            <span id="shop-price-slider-min"></span>
            <span> تومان</span>
          </div>
          <div>
            <span id="shop-price-slider-max"></span>
            <span> تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceSelector;
