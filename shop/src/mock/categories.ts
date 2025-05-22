import { ICategory } from '@/lib/types/categories';

export const categories: ICategory[] = [
  {
    id: 1,
    name: 'مردانه',
    href: '/shop/men',
    subCategories: [
      {
        id: 1,
        name: 'همه',
        href: '/shop/men/all',
      },
      {
        id: 2,
        name: 'لباس مردانه',
        href: '/shop/men/clothing',
        subItems: [
          { id: 1, name: 'همه', href: '/shop/men/clothing/all' },
          { id: 2, name: 'شلوار', href: '/shop/men/clothing/pants' },
          { id: 3, name: 'تی‌شرت', href: '/shop/men/clothing/tshirts' },
        ],
      },
      {
        id: 3,
        name: 'کفش مردانه',
        href: '/shop/men/shoes',
      },
    ],
  },
  {
    id: 2,
    name: 'زنانه',
    href: '/shop/women',
    subCategories: [
      {
        id: 1,
        name: 'همه',
        href: '/shop/women/all',
      },
      {
        id: 2,
        name: 'لباس زنانه',
        href: '/shop/women/clothing',
        subItems: [
          { id: 1, name: 'همه', href: '/shop/women/clothing/all' },
          { id: 2, name: 'مانتو', href: '/shop/women/clothing/coats' },
        ],
      },
    ],
  },
];

export const categoryCirclesBanners = [
  {
    id: 1,
    title: 'جوراب مردانه',
    image: '/images/categories/c1.jpg',
    link: '/shop',
  },
  {
    id: 2,
    title: 'کفش ورزشی مردانه',
    image: '/images/categories/c3.jpg',
    link: '/shop',
  },
  {
    id: 3,
    title: 'کیف مردانه',
    image: '/images/categories/c6.jpg',
    link: '/shop',
  },
  {
    id: 4,
    title: 'جوراب زنانه',
    image: '/images/categories/c2.jpg',
    link: '/shop',
  },
  {
    id: 5,
    title: 'کفش ورزشی زنانه',
    image: '/images/categories/c4.jpg',
    link: '/shop',
  },
  {
    id: 6,
    title: 'کیف زنانه',
    image: '/images/categories/c5.jpg',
    link: '/shop',
  },
];

export const categoryBanners = [
  {
    id: 1,
    image: '/images/banners/category-right.jpg',
    alt: 'بنر دسته‌بندی راست',
    link: '#',
  },
  {
    id: 2,
    image: '/images/banners/category-left.jpg',
    alt: 'بنر دسته‌بندی چپ',
    link: '#',
  },
];
