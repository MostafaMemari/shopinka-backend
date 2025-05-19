'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useSearch = (defaultSearch = '') => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialSearch = searchParams.get('search') || defaultSearch
  const [search, setSearch] = useState(initialSearch)

  useEffect(() => {
    const currentSearch = searchParams.get('search') || defaultSearch

    if (search !== currentSearch) {
      const params = new URLSearchParams(searchParams)

      if (search && search !== defaultSearch) {
        params.set('search', search)
      } else {
        params.delete('search')
      }

      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [search, pathname, router, searchParams, defaultSearch])

  return { search, setSearch }
}
