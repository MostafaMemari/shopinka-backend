export enum AttributeType {
  COLOR = 'COLOR',
  BUTTON = 'BUTTON'
}

export type Attribute = {
  id: string
  name: string
  slug: string
  userId: number
  type: AttributeType
  description: string | null
  createdAt: string
  updatedAt: string
}

export type AttributeFormValues = {
  id?: string
  name: string
  slug?: string | null
  type: AttributeType
  description?: string | null
}
