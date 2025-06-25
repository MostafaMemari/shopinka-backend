import { generateBlogSeoDescription } from '@/hooks/reactQuery/seoDescriptionGenerators'
import { Blog } from '@/types/app/blog.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'
import { blogFormSchema } from '../validators/blog.schema'
import { type InferType } from 'yup'
import { handleSeoSave } from '../services/seo/seo.service'
import { showToast } from '@/utils/showToast'
import { SeoForm, SeoMetaTargetType } from '@/types/app/seo.type'

type BlogForm = InferType<typeof blogFormSchema>

export const getBlogs = async (params?: Record<string, string>): Promise<Response<Blog[]>> => {
  const res = await serverApiFetch('/blog', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const getBlogById = async (id: number): Promise<{ status: number; data: Blog | null }> => {
  const res = await serverApiFetch(`/blog/${id}`, {
    method: 'GET'
  })

  return {
    ...res
  }
}

export const updateBlog = async (id: number, data: Partial<Blog>): Promise<{ status: number; data: Blog | null }> => {
  const res = await serverApiFetch(`/blog/${id}`, {
    method: 'PATCH',
    body: { ...data }
  })

  if (id) {
    await handleSeo(Number(id), data, true)
  } else {
    showToast({ type: 'error', message: 'خطا در دریافت آیدی وبلاگ' })
  }

  return {
    ...res
  }
}

export const createBlog = async (data: Blog): Promise<{ status: number; data: { blog: (Blog & { id: number }) | null } }> => {
  const res = await serverApiFetch('/blog', {
    method: 'POST',
    body: { ...data }
  })

  if (res.status === 200 || res.status === 201) {
    await handleSeo(res.data.blog.id, data)
  }

  return {
    ...res
  }
}

export const removeBlog = async (id: string): Promise<{ status: number; data: { message: string; blog: Blog } | null }> => {
  const res = await serverApiFetch(`/blog/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}

const handleSeo = async (blogId: number, data: Partial<BlogForm>, isUpdate?: boolean) => {
  const seoData = isUpdate
    ? {
        seo_title: data.seo_title,
        seo_description: data.seo_description,
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle,
        seo_ogDescription: data.seo_ogDescription,
        seo_ogImage: data.seo_ogImage,
        seo_robotsTag: data.seo_robotsTag
      }
    : {
        seo_title: data.seo_title || data.title,
        seo_description:
          data.seo_description ||
          generateBlogSeoDescription({
            title: data.title,
            description: data.content ?? ''
          }),
        seo_keywords: data.seo_keywords,
        seo_canonicalUrl: data.seo_canonicalUrl,
        seo_ogTitle: data.seo_ogTitle || data.title,
        seo_ogDescription:
          data.seo_ogDescription ||
          generateBlogSeoDescription({
            title: data.title,
            description: data.content ?? ''
          }),
        seo_ogImage: data.seo_ogImage || data.mainImageId,
        seo_robotsTag: data.seo_robotsTag
      }

  const seoResponse = await handleSeoSave(SeoMetaTargetType.blog, blogId, seoData as SeoForm)

  if (seoResponse.status !== 200 && seoResponse.status !== 201) {
    showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

    return false
  }

  return true
}
