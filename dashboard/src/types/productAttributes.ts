export enum AttributeType {
  COLOR = 'color',
  BUTTON = 'button'
}

export type Attribute = {
  id: number
  name: string
  slug: string
  userId: number
  type: AttributeType
  description: string | null
  createdAt: string
  updatedAt: string
}

export type CreateAttributeFormValues = {
  name: string
  slug?: string | null
  type: AttributeType
  description?: string | null
}
