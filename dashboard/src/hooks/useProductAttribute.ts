import { useQuery } from '@tanstack/react-query'
import { getAttributes } from '@/libs/api/attributes.api'

export function useProductAttribute() {
  const fetchProducts = () => getAttributes().then(res => res.data)

  return useQuery<any, Error>({
    queryKey: ['product-attributes'],
    queryFn: fetchProducts,
    enabled: false,
    refetchOnWindowFocus: false
  })
}
