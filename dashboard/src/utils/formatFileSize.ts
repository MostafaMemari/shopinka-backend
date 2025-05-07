export const formatFileSize = (size: number): string => {
  const sizeInKB = Math.round(size / 100) / 10

  if (sizeInKB > 1000) {
    const sizeInMB = sizeInKB / 1000

    return `${sizeInMB.toFixed(1)} MB`
  }

  return `${sizeInKB.toFixed(1)} KB`
}

export default formatFileSize
