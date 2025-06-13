'use client';

import React, { useEffect, useRef, useState } from 'react';
import MobileDrawer from '@/components/MobileDrawer';
import { IoChevronBack } from 'react-icons/io5';

interface Props {
  description: string;
}

export default function ProductDescription({ description }: Props) {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (descriptionRef.current) {
        setShowToggle(descriptionRef.current.scrollHeight > 500);
      }
    };
    checkOverflow();
  }, [description]);

  const handleDesktopToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="py-2" id="description">
      <div
        className={`mb-6 transition-all duration-300 md:mb-10 ${isExpanded ? '' : 'max-h-[500px] overflow-hidden'}`}
        id="descriptionContainer"
      >
        <div ref={descriptionRef} className="space-y-6 text-sm">
          {description ? (
            <div className="prose prose-sm max-w-none text-text/80 leading-7" dangerouslySetInnerHTML={{ __html: description }} />
          ) : (
            <p className="text-text/60">توضیحاتی برای نمایش وجود ندارد.</p>
          )}
        </div>
      </div>

      {showToggle && (
        <div className="flex justify-center">
          <button className="btn-secondary-nobg hidden md:flex" onClick={handleDesktopToggle}>
            {isExpanded ? 'بستن' : 'مشاهده بیشتر'}
            <IoChevronBack className="h-5 w-5" />
          </button>

          <button type="button" onClick={() => setIsOpenDrawer(true)} className="btn-secondary-nobg md:hidden">
            مشاهده بیشتر
            <IoChevronBack className="h-5 w-5" />
          </button>
        </div>
      )}

      <MobileDrawer
        isOpen={isOpenDrawer}
        triggerButton={null}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title="توضیحات محصول"
      >
        <div>
          {description && <div className="prose prose-sm max-w-none text-text/80 p-4" dangerouslySetInnerHTML={{ __html: description }} />}
        </div>
      </MobileDrawer>
    </div>
  );
}
