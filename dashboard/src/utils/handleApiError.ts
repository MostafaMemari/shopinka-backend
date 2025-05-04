export const handleApiError = (status: number, errorMessages: Record<number, string>, successStatusCodes: number[] = [200, 201]): string | null => {
  if (!successStatusCodes.includes(status)) {
    return errorMessages[status] || 'خطای ناشناخته‌ای رخ داده است'
  }

  return null
}
