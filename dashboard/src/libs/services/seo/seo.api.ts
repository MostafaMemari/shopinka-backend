import { Seo } from '@/types/app/seo.type'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const saveSeoMeta = async (
  type: 'product' | 'blog' | 'tag' | 'category',
  id: number,
  data: Omit<Seo, 'productId' | 'blogId' | 'tagId' | 'categoryId'>
): Promise<{ status: number; data: { seo: (Seo & { id: number }) | null } }> => {
  try {
    const targetIdKey = type === 'product' ? 'productId' : type === 'blog' ? 'blogId' : type === 'tag' ? 'tagId' : 'categoryId'

    const res = await serverApiFetch('/seo', {
      method: 'PUT',
      body: {
        ...data,
        [targetIdKey]: id,
        ...(targetIdKey !== 'productId' && { productId: undefined }),
        ...(targetIdKey !== 'blogId' && { blogId: undefined }),
        ...(targetIdKey !== 'tagId' && { tagId: undefined }),
        ...(targetIdKey !== 'categoryId' && { categoryId: undefined })
      }
    })

    return res
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: { seo: null }
    }
  }
}
