'use client';

import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { useQueryState } from 'nuqs';
import MobileFilterDrawer from '../components/FilterMobile/MobileFilterDrawer';

interface FilterConfig {
  categories: string[];
  brands: { id: string; label: string; value: string }[];
  colors: { id: string; label: string; color: string }[];
}

const MobileFilterSection: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // مدیریت فیلترها با useQueryState
  const [categoryIds, setCategoryIds] = useQueryState('categoryIds', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [brandIds, setBrandIds] = useQueryState('brandIds', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [colorIds, setColorIds] = useQueryState('colorIds', {
    defaultValue: '',
    history: 'replace',
    shallow: false,
  });
  const [onlyAvailable, setOnlyAvailable] = useQueryState('onlyAvailable', {
    defaultValue: 'false',
    history: 'replace',
    shallow: false,
  });
  const [onlySpecial, setOnlySpecial] = useQueryState('onlySpecial', {
    defaultValue: 'false',
    history: 'replace',
    shallow: false,
  });

  // نمونه config (می‌توانید از API یا هوک استفاده کنید)
  const filterConfig: FilterConfig = {
    categories: ['الکترونیک', 'لباس', 'کتاب', 'ورزشی'],
    brands: [
      { id: 'b1', label: 'نایک', value: 'nike' },
      { id: 'b2', label: 'آدیداس', value: 'adidas' },
      { id: 'b3', label: 'سامسونگ', value: 'samsung' },
    ],
    colors: [
      { id: 'c1', label: 'قرمز', color: '#ff0000' },
      { id: 'c2', label: 'آبی', color: '#0000ff' },
      { id: 'c3', label: 'سبز', color: '#00ff00' },
    ],
  };

  const handleFilterChange = (filters: {
    categoryIds?: string[];
    brandIds?: string[];
    colorIds?: string[];
    onlyAvailable?: boolean;
    onlySpecial?: boolean;
  }) => {
    if (filters.categoryIds) {
      setCategoryIds(filters.categoryIds.join(',') || '');
    }
    if (filters.brandIds) {
      setBrandIds(filters.brandIds.join(',') || '');
    }
    if (filters.colorIds) {
      setColorIds(filters.colorIds.join(',') || '');
    }
    if (filters.onlyAvailable !== undefined) {
      setOnlyAvailable(filters.onlyAvailable.toString());
    }
    if (filters.onlySpecial !== undefined) {
      setOnlySpecial(filters.onlySpecial.toString());
    }
  };

  return (
    <>
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={handleFilterChange}
        config={filterConfig}
      />
    </>
  );
};

export default MobileFilterSection;
