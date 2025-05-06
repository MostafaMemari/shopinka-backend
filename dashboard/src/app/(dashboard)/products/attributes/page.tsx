import { getAttributes } from '@/libs/api/productAttributes'
import ProductAttributeView from '@/views/pages/products/attribute/ProductAttributeView'

const ProductAttribute = async () => {
  const res = await getAttributes()

  return <ProductAttributeView data={res.data.items.flat()} />
}

export default ProductAttribute
