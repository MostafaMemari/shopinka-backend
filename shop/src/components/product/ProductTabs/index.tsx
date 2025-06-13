'use client';

import React, { useState } from 'react';
import ProductDescription from './ProductDescription';
import ProductSpecifications from './ProductSpecifications';
import ProductComments from '@/components/productDetails/Comment/ProductComments';
import { useComment } from '@/hooks/reactQuery/comment/useComment';

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
  productId: number;
}

export default function ProductTabs({ description, specifications, productId }: Props) {
  const { data, isLoading } = useComment({ params: { productId, page: 1 } });

  const tabs: Tab[] = [
    { id: 'description', title: 'معرفی' },
    { id: 'specs', title: 'مشخصات' },
    { id: 'comments', title: 'دیدگاه ها', count: data?.pager.totalCount || 0 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDescription description={description} />;
      case 'specs':
        return <ProductSpecifications specifications={specifications} />;
      case 'comments':
        return <ProductComments productId={productId} />;
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
                  {isLoading && tab.id === 'comments' ? (
                    <span className="absolute -left-5 -top-4 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                  ) : null}
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
