import { QueryKeys } from '@/types/enums/query-keys'
import { useQueryClient } from '@tanstack/react-query'

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient()

  const invalidate = (keys: QueryKeys | QueryKeys[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys]

    keysArray.forEach(key => {
      queryClient.invalidateQueries({ queryKey: [key] })
    })
  }

  return { invalidate }
}
