import { Contact } from '@/types/app/contact.type'
import { serverApiFetch } from '../serverApiFetch'
import { Pager, Response } from '@/types/response'

export const getContacts = async (params?: Record<string, string>): Promise<Response<Contact[]>> => {
  const res = await serverApiFetch('/contact', {
    method: 'GET',
    query: { ...params }
  })

  return {
    ...res
  }
}

export const removeContact = async (id: string): Promise<{ status: number; data: { message: string; page: Pager } | null }> => {
  const res = await serverApiFetch(`/contact/${id}`, { method: 'DELETE' })

  return {
    ...res
  }
}
