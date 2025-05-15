import { Comment, CommentForm } from '@/types/app/comment.type'
import { Response } from '@/types/response'
import { serverApiFetch } from '@/utils/api/serverApiFetch'

export const getComments = async (params?: Record<string, string>): Promise<Response<Comment[]>> => {
  try {
    const res = await serverApiFetch('/comment/admin', {
      method: 'GET',
      query: { ...params }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: {
        items: [],
        pager: {
          totalCount: 0,
          totalPages: 0,
          currentPage: 0,
          hasNextPage: false,
          hasPreviousPage: false
        }
      }
    }
  }
}

export const updateComment = async (id: string, data: Partial<CommentForm>): Promise<{ status: number; data: Comment | null }> => {
  try {
    const res = await serverApiFetch(`/comment/${id}`, {
      method: 'PATCH',
      body: { ...data }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const createComment = async (data: CommentForm): Promise<{ status: number; data: Comment | null }> => {
  try {
    const res = await serverApiFetch('/comment', {
      method: 'POST',
      body: { ...data }
    })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: null
    }
  }
}

export const removeComment = async (id: string): Promise<{ status: number; data: { message: string; comment: CommentForm } | null }> => {
  try {
    const res = await serverApiFetch(`/comment/${id}`, { method: 'DELETE' })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: error.message
    }
  }
}

export const toggleCommentStatus = async (id: string): Promise<{ status: number; data: { message: string; comment: CommentForm } | null }> => {
  try {
    const res = await serverApiFetch(`/comment/toggle-active/${id}`, { method: 'PATCH' })

    return {
      ...res
    }
  } catch (error: any) {
    return {
      status: error.message.includes('401') ? 401 : 500,
      data: error.message
    }
  }
}
