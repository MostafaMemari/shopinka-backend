import { pageSchema } from '@/libs/validators/page.schema'
import * as yup from 'yup'

export type Page = {
  id: number
  name: string
  slug: string | null
  description: string | null
  userId: number
  createdAt: string
  updatedAt: string
}

export type PageForm = yup.InferType<typeof pageSchema>
