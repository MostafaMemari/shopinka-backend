import { useQuery } from '@tanstack/react-query'
import { getAttributes } from '@/libs/api/productAttributes.api'

export function useProductAttribute() {
  const fetchProducts = () => getAttributes().then(res => res.data)

  return useQuery<any, Error>({
    queryKey: ['product-attributes'],
    queryFn: fetchProducts,
    enabled: false,
    refetchOnWindowFocus: false
  })
}
