'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const usePaginationParams = (defaultPage = 1, defaultSize = 10) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const initialPage = parseInt(searchParams.get('page') || `${defaultPage}`, 10)
  const initialSize = parseInt(searchParams.get('size') || `${defaultSize}`, 10)

  const [page, setPage] = useState(initialPage)
  const [size, setSize] = useState(initialSize)

  useEffect(() => {
    const currentPage = searchParams.get('page') || `${defaultPage}`
    const currentSize = searchParams.get('size') || `${defaultSize}`

    if (page.toString() !== currentPage || size.toString() !== currentSize) {
      const params = new URLSearchParams()

      if (page !== defaultPage) params.set('page', page.toString())
      if (size !== defaultSize) params.set('size', size.toString())
      const query = params.toString()

      router.push(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
    }
  }, [page, size, pathname, router, searchParams, defaultPage, defaultSize])

  return { page, size, setPage, setSize }
}
