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
        href: '/products/list',
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
    label: 'مدیریت رسانه‌ها',
    icon: 'tabler-photo',
    children: [
      {
        label: 'همه رسانه‌ها',
        href: '/media',
        icon: 'tabler-files'
      }
    ]
  },
  {
    label: 'دسته بندی‌ها',
    icon: 'tabler-category',
    href: '/categories'
  }
]

export default horizontalMenuData
