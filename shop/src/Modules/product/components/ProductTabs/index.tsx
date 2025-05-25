'use client';

import React, { useState } from 'react';
import ProductDescription from './ProductDescription';
import { IComment } from '@/lib/types/comments';
import ProductSpecifications from './ProductSpecifications';
import ProductComments from '@/Modules/product/components/productDetails/Comment/ProductComments';

interface Tab {
  id: string;
  title: string;
  count?: number;
}

interface Props {
  description: string;
  specifications: Array<{
    title: string;
    values: string[];
  }>;
  comments: IComment[];
}

export default function ProductTabs({ description, specifications, comments }: Props) {
  const tabs: Tab[] = [
    { id: 'description', title: 'معرفی' },
    { id: 'specs', title: 'مشخصات' },
    { id: 'comments', title: 'دیدگاه ها', count: comments?.length || 0 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDescription description={description} />;
      case 'specs':
        return <ProductSpecifications specifications={specifications} />;
      case 'comments':
        return <ProductComments comments={comments} />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="rounded-lg bg-muted p-4 shadow-base">
        <div className="mb-6">
          <ul className="-mb-px flex justify-between gap-x-2 border-b text-center text-sm font-medium xs:justify-start xs:gap-x-4 xs:text-base">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative cursor-pointer inline-block rounded-t-lg border-b-2 px-2 pb-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary dark:border-emerald-400 dark:text-emerald-400'
                      : 'border-transparent hover:text-text/90 dark:hover:text-zinc-300'
                  }`}
                >
                  {tab.title}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="absolute -left-5 -top-4 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600 xs:text-sm">
                      {tab.count}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-16 divide-y">{renderTabContent()}</div>
      </div>
    </div>
  );
}
