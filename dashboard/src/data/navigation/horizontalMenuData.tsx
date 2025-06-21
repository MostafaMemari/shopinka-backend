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
        label: 'افزودن',
        href: '/products/add',
        icon: 'tabler-plus'
      },
      {
        label: 'لیست',
        href: '/products',
        icon: 'tabler-list'
      },
      {
        label: 'ویژگی‌ها',
        href: '/products/attributes',
        icon: 'tabler-layers-difference'
      }
    ]
  },
  {
    label: 'وبلاگ',
    icon: 'tabler-news',
    children: [
      {
        label: 'افزودن',
        href: '/blogs/add',
        icon: 'tabler-plus'
      },
      {
        label: 'لیست',
        href: '/blogs',
        icon: 'tabler-list'
      }
    ]
  },
  {
    label: 'مدیریت رسانه‌ها',
    icon: 'tabler-photo',
    href: '/media'
  },
  {
    label: 'برگه ها',
    icon: 'tabler-file-text',
    href: '/pages'
  },
  {
    label: 'تماس با ما',
    icon: 'tabler-mail',
    href: '/contact'
  },
  {
    label: 'دسته بندی‌ها',
    icon: 'tabler-category',
    href: '/categories'
  },
  {
    label: 'برچسب‌ها',
    icon: 'tabler-tag',
    href: '/tags'
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
    label: 'حمل و نقل',
    icon: 'tabler-truck',
    href: '/shipping'
  }
]

export default horizontalMenuData
