// Type Imports
import type { HorizontalMenuDataType } from '@/types/menuTypes'

const horizontalMenuData = (): HorizontalMenuDataType[] => [
  {
    label: 'خانه',
    href: '/home',
    icon: 'tabler-smart-home'
  },
  {
    label: 'محصولات',
    icon: 'tabler-shopping-cart',
    children: [
      {
        label: 'لیست',
        href: '/products',
        icon: 'tabler-list'
      },
      {
        label: 'افزودن',
        href: '/products/add',
        icon: 'tabler-plus'
      },
      {
        label: 'ویژگی‌ها',
        href: '/products/attributes',
        icon: 'tabler-layers-difference'
      }
    ]
  },
  {
    label: 'مدیریت رسانه‌ها',
    icon: 'tabler-photo',
    href: '/media'
  },
  {
    label: 'دسته بندی‌ها',
    icon: 'tabler-category',
    href: '/categories'
  },
  {
    label: 'نظرات',
    icon: 'tabler-message-circle',
    href: '/comments'
  },
  {
    label: 'سفارشات',
    icon: 'tabler-package',
    href: '/orders'
  },
  {
    label: 'وبلاگ',
    icon: 'tabler-news',
    href: '/blog'
  },
  {
    label: 'برچسب‌ها',
    icon: 'tabler-tag',
    href: '/tags'
  },
  {
    label: 'حمل و نقل',
    icon: 'tabler-truck',
    href: '/shipping'
  }
]

export default horizontalMenuData
