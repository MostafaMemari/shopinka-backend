'use client'

import { useState, useEffect } from 'react'
import ProductAttributeTable from '@/views/pages/products/attribute/ProductAttributeTable'

// Attribute data type
export type attributeType = {
  id: number
  attributeName: string
  description: string
  values: string
}

// Sample data (simulating API response)
const fakeData: attributeType[] = [
  {
    id: 1,
    attributeName: 'Color',
    description: 'رنگ آبی',
    values: 'آبی، قرمز، سبز'
  },
  {
    id: 2,
    attributeName: 'ColorSelector',
    description: 'انتخاب‌کننده رنگ برای محصولات',
    values: 'هگز، آر‌جی‌بی'
  },
  {
    id: 3,
    attributeName: 'Values',
    description: 'گزینه‌های مقدار محصول',
    values: 'کوچک، متوسط، بزرگ'
  }
]

const ECommerceProductsAttribute = () => {
  // State for data
  const [data, setData] = useState<attributeType[]>([])

  // Simulate fetching data
  useEffect(() => {
    // Replace with real API call later
    setData(fakeData)
  }, [])

  return <ProductAttributeTable data={data} setData={setData} />
}

export default ECommerceProductsAttribute
