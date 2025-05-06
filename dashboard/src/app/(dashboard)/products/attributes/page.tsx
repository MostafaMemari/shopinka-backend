import { getAttributes } from '@/libs/api/productAttributes'
import ProductAttributeTable from '@/views/pages/products/attribute/ProductAttributeTable'

const ProductAttribute = async () => {
  const res = await getAttributes()

  console.log(res.data.items.flat())
  console.log(res.data.items)

  return <ProductAttributeTable data={res.data.items.flat()} />
}

export default ProductAttribute
