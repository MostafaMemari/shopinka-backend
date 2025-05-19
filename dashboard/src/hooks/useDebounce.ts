'use client'

import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, debounceDelay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, debounceDelay)

    return () => clearTimeout(handler)
  }, [value, debounceDelay])

  return debouncedValue
}
