import { getAttributes } from '@/libs/api/productAttributes'
import ProductAttributeTable from '@/views/pages/products/attribute/ProductAttributeTable'

const ECommerceProductsAttribute = async () => {
  const res = await getAttributes()

  return <ProductAttributeTable data={res.data.items} />
}

export default ECommerceProductsAttribute
