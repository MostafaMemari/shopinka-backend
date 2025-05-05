// Type Imports
import type { VerticalMenuDataType } from '@/types/menuTypes'

const verticalMenuData = (): VerticalMenuDataType[] => [
  {
    label: 'خانه',
    href: '/home',
    icon: ''
  },
  {
    label: 'About',
    href: '/about',
    icon: 'tabler-info-circle'
  }
]

export default verticalMenuData
