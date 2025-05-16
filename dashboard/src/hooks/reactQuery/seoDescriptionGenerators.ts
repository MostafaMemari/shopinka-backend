import { stripHtml } from '@/utils/formatters'

export const generateBlogSeoDescription = (data: { title?: string; description?: string }) => {
  const baseContent = stripHtml(data.description || '', true, 170) || ''
  const trimmedContent = baseContent.slice(0, 170)

  if (trimmedContent) return trimmedContent

  if (data.title) {
    return `مقاله‌ای درباره ${data.title} با بررسی دقیق و اطلاعات مفید را بخوانید.`
  }

  return 'مطالعه این مقاله اطلاعات مفیدی در اختیار شما قرار می‌دهد.'
}

export const generateProductSeoDescription = (data: { title?: string; description?: string }) => {
  const baseContent = stripHtml(data.description || '', true, 170) || ''
  const trimmedContent = baseContent.slice(0, 170)

  if (trimmedContent) return trimmedContent

  if (data.title) {
    return `بررسی مشخصات، قیمت و خرید محصول ${data.title} با بهترین کیفیت و اطلاعات کامل.`
  }

  return 'اطلاعات کامل درباره این محصول را مشاهده کنید.'
}

export const generateCategorySeoDescription = (data: { name?: string; description?: string }) => {
  const baseContent = stripHtml(data.description || '', true, 170) || ''
  const trimmedContent = baseContent.slice(0, 170)

  if (trimmedContent) return trimmedContent

  if (data.name) {
    return `مشاهده محصولات و مطالب مرتبط با دسته‌بندی ${data.name} همراه با بررسی کامل و قیمت‌ها.`
  }

  return 'اطلاعات کامل درباره این دسته‌بندی را مشاهده کنید.'
}

export const generateTagSeoDescription = (data: { name?: string; description?: string }) => {
  const baseContent = stripHtml(data.description || '', true, 170) || ''
  const trimmedContent = baseContent.slice(0, 170)

  if (trimmedContent) return trimmedContent

  if (data.name) {
    return `مطالب مرتبط با تگ ${data.name} را مطالعه کنید. جدیدترین اطلاعات و مقالات را ببینید.`
  }

  return 'مطالب دسته‌بندی شده با این تگ را مشاهده کنید.'
}
