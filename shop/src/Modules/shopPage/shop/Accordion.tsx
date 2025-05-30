'use client';

import { FC, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className="relative" data-accordion-item>
      <div className="w-full text-right cursor-pointer" data-accordion-button onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between gap-2 text-sm md:text-base">
          <span>{title}</span>
          <div className="min-w-fit">
            <FiChevronLeft className={`h-5 w-5 duration-300 ${isOpen ? 'rotate-90' : ''}`} />
          </div>
        </div>
      </div>
      <div className={`relative overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-60' : 'max-h-0'}`} data-accordion-content>
        <div className="custom-scrollbar mt-4 max-h-60 overflow-y-auto pl-1">{children}</div>
      </div>
    </li>
  );
};

export default Accordion;
