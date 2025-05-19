function deepEqual(value1: any, value2: any): boolean {
  if (value1 === value2) {
    return true
  }

  if (value1 == null || value2 == null) {
    return false
  }

  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false
    }

    for (let i = 0; i < value1.length; i++) {
      if (!deepEqual(value1[i], value2[i])) {
        return false
      }
    }

    return true
  }

  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      if (!Object.prototype.hasOwnProperty.call(value2, key) || !deepEqual(value1[key], value2[key])) {
        return false
      }
    }

    return true
  }

  return false
}

export function getChangedFields<T extends Record<string, any>>(original: T, updated: Partial<T>, nullableKeys: (keyof T)[] = []): Partial<T> {
  const changedFields: Partial<T> = {}

  for (const key in original) {
    if (Object.prototype.hasOwnProperty.call(original, key)) {
      const originalValue = original[key]
      const updatedHasKey = Object.prototype.hasOwnProperty.call(updated, key)
      const updatedValue = updated[key]

      if (updatedHasKey) {
        if (!deepEqual(originalValue, updatedValue)) {
          changedFields[key] = updatedValue
        }
      } else if (nullableKeys.includes(key)) {
        changedFields[key] = null as any
      }
    }
  }

  return changedFields
}

export function cleanObject<T extends Record<string, any>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return [key, value.trim() || null]
        }

        if (Array.isArray(value)) {
          return [key, value]
        }

        return [key, value]
      })
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
  ) as T
}
