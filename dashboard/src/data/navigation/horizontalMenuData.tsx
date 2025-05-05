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
        label: 'ویژگی ها',
        href: '/products/attributes',
        icon: 'tabler-layers-difference'
      }
    ]
  }
]

export default horizontalMenuData
