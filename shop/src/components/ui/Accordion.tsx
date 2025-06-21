'use client';

import React from 'react';
import { Disclosure } from '@headlessui/react';
import { BiChevronLeft } from 'react-icons/bi';

interface FaqItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  category: string;
  items: FaqItem[];
}

const Accordion: React.FC<AccordionProps> = ({ category, items }) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-x-3">
        <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
        <p className="text-lg sm:text-xl font-semibold text-gray-800">{category}</p>
      </div>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="relative border-b border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <Disclosure as="div">
              {({ open }) => (
                <div>
                  <Disclosure.Button className="w-full px-4 py-3 sm:px-6 sm:py-4 text-right cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-3 text-sm sm:text-base font-medium text-gray-700">
                      <span>{item.question}</span>
                      <BiChevronLeft
                        className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                      />
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 sm:px-6 py-4 text-sm sm:text-base text-gray-600 bg-gray-50/50 transition-all duration-300">
                    {item.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Accordion;
