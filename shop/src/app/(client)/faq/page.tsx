'use client';

import React, { useState } from 'react';
import { SiSearxng } from 'react-icons/si';
import Link from 'next/link';
import Accordion from '@/components/ui/Accordion';
import { faqData } from '@/data/faqData';

function Page() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFaqData = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="container rounded-2xl bg-muted/70 shadow-lg border border-border/60 p-8 transition-all duration-200">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="relative text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-primary drop-shadow-lg">
          سوالات متداول
          <span className="absolute -bottom-2 left-0 h-1 w-3/5 rounded-full bg-primary transition-all duration-500 animate-pulse"></span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          سوال خود را پیدا نکردید؟{' '}
          <Link href="/contact" className="text-primary font-medium transition-colors">
            با ما تماس بگیرید
          </Link>
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <p className="mb-4 text-sm sm:text-base text-gray-600">سوال خود را جستجو کنید</p>
            <div className="flex items-center rounded-lg bg-white border border-gray-200 px-3 py-2 shadow-sm">
              <SiSearxng className="h-5 w-5 text-gray-500" />
              <label className="sr-only">جستجوی سوالات متداول</label>
              <input
                className="flex-grow bg-transparent px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                placeholder="دنبال چه سوالی می‌گردید؟"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {filteredFaqData.length > 0 ? (
            filteredFaqData.map((section, index) => <Accordion key={index} category={section.category} items={section.items} />)
          ) : (
            <p className="text-sm sm:text-base text-gray-600 text-center">هیچ نتیجه‌ای برای {searchTerm} یافت نشد.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
