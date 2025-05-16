'use client'

import { createBlog, getBlogById, getBlogs, updateBlog } from '@/libs/api/blog.api'
import { handleSeoSave } from '@/libs/services/seo/seo.service'
import { Blog, BlogStatus } from '@/types/app/blog.type'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { cleanObject } from '@/utils/getChangedFields'
import { showToast } from '@/utils/showToast'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { useFormSubmit } from '../useFormSubmit'
import { GalleryItem } from '@/types/app/gallery'
import { type UseFormReturn } from 'react-hook-form'
import { blogFormSchema } from '@/libs/validators/blog.schema'
import { type InferType } from 'yup'
import { errorBlogMessage } from '@/messages/blog.message'
import { useRouter } from 'next/navigation'
import { stripHtml } from '@/utils/formatters'
import { generateBlogSeoDescription } from './seoDescriptionGenerators'

export function useBlogs({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchBlogs = () => getBlogs(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Blogs, params],
    queryFn: fetchBlogs,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

type BlogFormType = InferType<typeof blogFormSchema>

interface UseBlogFormProps {
  id?: number | null
  initialData?: Blog
  methods: UseFormReturn<BlogFormType>
}

export const useBlogForm = ({ id, initialData, methods }: UseBlogFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(!!id)
  const [initialBlog, setInitialBlog] = useState<Blog | null>(null)
  const isUpdate = !!id || !!initialData

  useEffect(() => {
    if (id && !initialData) {
      setIsLoading(true)
      getBlogById(id)
        .then(response => {
          const blog = response.data

          console.log(blog)

          setInitialBlog(blog)

          if (blog) {
            Object.entries(blog).forEach(([key, value]) => {
              if (key in methods.getValues() && typeof value !== 'object') {
                methods.setValue(key as keyof BlogFormType, value ?? null)
              }
            })

            if (blog.seoMeta) {
              methods.setValue('seo_title', blog.seoMeta.title)
              methods.setValue('seo_description', blog.seoMeta.description)
              methods.setValue('seo_keywords', blog.seoMeta.keywords)
              methods.setValue('seo_canonicalUrl', blog.seoMeta.canonicalUrl)
              methods.setValue('seo_ogTitle', blog.seoMeta.ogTitle)
              methods.setValue('seo_ogDescription', blog.seoMeta.ogDescription)
              methods.setValue('seo_ogImage', blog.seoMeta.ogImage)
              methods.setValue('seo_robotsTag', blog.seoMeta.robotsTag)
            }

            if (blog.mainImage) {
              methods.setValue('mainImage' as any, blog.mainImage)
            }

            methods.setValue('categoryIds', blog.categories?.map(category => category.id) || [])
          }
        })
        .catch(() => {
          showToast({ type: 'error', message: 'خطا در بارگذاری بلاگ' })
        })
        .finally(() => setIsLoading(false))
    } else if (initialData) {
      setInitialBlog(initialData)
      Object.entries(initialData).forEach(([key, value]) => {
        if (key in methods.getValues() && typeof value !== 'object') {
          methods.setValue(key as keyof BlogFormType, value ?? null)
        }
      })

      if (initialData.mainImage) {
        methods.setValue('mainImage' as any, initialData.mainImage as GalleryItem)
      }

      methods.setValue('categoryIds', initialData.categoryIds || [])

      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [id, initialData, methods, router])

  const { isLoading: submitLoading, onSubmit: submitForm } = useFormSubmit<BlogFormType & { id?: string }>({
    createApi: async (formData: BlogFormType) => {
      const response = await createBlog(formData as unknown as Blog)

      return { status: response.status, data: { id: response.data?.blog?.id } }
    },
    updateApi: async (blogId: string, formData: Partial<BlogFormType>) => {
      if (!id) throw new Error('Blog ID is required for update')

      return updateBlog(Number(blogId), formData as unknown as Partial<Blog>)
    },

    errorMessages: errorBlogMessage,
    queryKey: QueryKeys.Blogs,
    successMessage: isUpdate ? 'بلاگ با موفقیت به‌روزرسانی شد' : 'بلاگ با موفقیت ایجاد شد',
    initialData: initialBlog
      ? {
          ...initialBlog,
          id: String(initialBlog.id)
        }
      : id
        ? { id: String(id) }
        : undefined,
    isUpdate
  })

  const handleSeo = useCallback(async (blogId: number, data: Partial<BlogFormType>) => {
    const seoData = {
      seo_title: data.seo_title || data.title,
      seo_description: data.seo_description || generateBlogSeoDescription({ title: data.title, description: data.content ?? '' }),
      seo_keywords: data.seo_keywords ?? undefined,
      seo_canonicalUrl: data.seo_canonicalUrl ?? undefined,
      seo_ogTitle: data.seo_ogTitle || data.title,
      seo_ogDescription: data.seo_ogDescription || generateBlogSeoDescription({ title: data.title, description: data.content ?? '' }),
      seo_ogImage: data.seo_ogImage || data.mainImageId,
      seo_robotsTag: data.seo_robotsTag
    }

    const seoResponse = await handleSeoSave('blog', blogId, seoData)

    if (seoResponse.status !== 200 && seoResponse.status !== 201) {
      showToast({ type: 'error', message: 'خطا در ذخیره SEO' })

      return false
    }

    return true
  }, [])

  const handleButtonClick = useCallback(
    async (type: 'cancel' | 'draft' | 'publish') => {
      if (type === 'cancel') {
        router.push('/blogs')

        return
      }

      await methods
        .handleSubmit(async (data: BlogFormType) => {
          setIsLoading(true)
          const status = type === 'publish' ? BlogStatus.PUBLISHED : BlogStatus.DRAFT

          const cleanedData = cleanObject({
            ...data,
            status,
            categoryIds: data.categoryIds ?? []
          })

          const response = await submitForm(cleanedData, () => router.refresh())

          if (response?.status === 201) router.replace(`/blogs/edit?id=${response.data?.id}`)

          console.log(response)

          const blogId = isUpdate ? id! : response?.data?.id

          if (blogId) {
            await handleSeo(Number(blogId), cleanedData)
          } else {
            showToast({ type: 'error', message: 'خطا در دریافت آیدی بلاگ' })
          }
        })()
        .finally(() => setIsLoading(false))
    },
    [methods, submitForm, id, isUpdate, router, handleSeo]
  )

  return {
    isLoading: isLoading || submitLoading,
    handleButtonClick,
    isUpdate
  }
}
