'use client';

import React, { useEffect, useRef, useState } from 'react';
import MobileDrawer from '@/components/MobileDrawer';
import { IoChevronBack } from 'react-icons/io5';

interface ProductSpecificationsProps {
  specifications: Array<{
    title: string;
    values: string[];
  }>;
}

export default function ProductSpecifications({ specifications }: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (specsRef.current) {
        setShowToggle(specsRef.current.scrollHeight > 500);
      }
    };
    checkOverflow();
  }, [specifications]);

  const handleDesktopToggle = () => setIsExpanded(!isExpanded);

  return (
    <div className="py-2" id="specs">
      <div className={`mb-6 transition-all duration-300 md:mb-10 ${isExpanded ? '' : 'max-h-[500px] overflow-hidden'}`} id="specsContainer">
        <div ref={specsRef} className="space-y-6 text-sm">
          {specifications?.length > 0 ? (
            <ul>
              {specifications.map((spec, index) => (
                <li key={index} className="grid grid-cols-3 gap-x-2 lg:grid-cols-5">
                  <div className="col-span-1 text-text/60">{spec.title}</div>
                  <div className="col-span-2 border-b pb-4 text-text/90 lg:col-span-4">
                    <ul className="space-y-4">{spec.values?.map((value, valueIndex) => <li key={valueIndex}>{value}</li>)}</ul>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text/60">توضیحاتی برای نمایش وجود ندارد.</p>
          )}
        </div>
      </div>

      {showToggle && (
        <div className="flex justify-center">
          {/* Desktop button */}
          <button onClick={handleDesktopToggle} className="btn-secondary-nobg hidden md:flex" id="toggleSpecsButton">
            {isExpanded ? 'بستن' : 'مشاهده بیشتر'}
            <IoChevronBack className="h-5 w-5" />
          </button>

          {/* Mobile button */}
          <button id="specsButtonMobile" className="btn-secondary-nobg md:hidden" onClick={() => setIsDrawerOpen(true)}>
            مشاهده بیشتر
            <IoChevronBack className="h-5 w-5" />
          </button>
        </div>
      )}

      <MobileDrawer
        isOpen={isDrawerOpen}
        onOpen={() => setIsDrawerOpen(true)}
        onClose={() => setIsDrawerOpen(false)}
        triggerButton={null}
        title="مشخصات محصول"
      >
        <div className="p-4">
          {specifications?.length > 0 &&
            specifications.map((spec, index) => (
              <li key={index} className="grid grid-cols-3 gap-x-2 lg:grid-cols-5">
                <div className="col-span-1 text-text/60">{spec.title}</div>
                <div className="col-span-2 border-b pb-4 text-text/90 lg:col-span-4">
                  <ul className="space-y-4">
                    {spec.values.map((value, valueIndex) => (
                      <li key={valueIndex}>{value}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
        </div>
      </MobileDrawer>
    </div>
  );
}
