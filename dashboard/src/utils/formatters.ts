export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${sizes[i]} ${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}`
}

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(dateString))
}

export const cleanObject = <T extends Record<string, any>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj)
      .map(([key, value]) => [key, typeof value === 'string' && value !== '' ? value.trim() : value])
      .filter(([_, value]) => value !== null && value !== '' && value !== undefined)
  ) as T
}

export const stripHtml = (html: string, addEllipsis: boolean = false, maxLength: number = 100): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  let text = doc.body.textContent || ''

  if (addEllipsis && text.length > maxLength) {
    text = text.substring(0, maxLength).trim() + '...'
  }

  return text
}

export const truncateText = (text: string, wordLimit = 20): string => {
  const words = text.trim().split(/\s+/)

  if (words.length <= wordLimit) return text

  return words.slice(0, wordLimit).join(' ') + '...'
}
