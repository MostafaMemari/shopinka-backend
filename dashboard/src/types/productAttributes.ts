export enum AttributeType {
  COLOR = 'COLOR',
  BUTTON = 'BUTTON'
}

export type Attribute = {
  id: number
  name: string
  slug: string
  userId: number
  type: AttributeType
  description: string | null
  values: AttributeValues[] | []
  createdAt: string
  updatedAt: string
}

export type AttributeValues = {
  id: number
  name: string
  slug: string
  colorCode: string | null
  buttonLabel: string | null
  attributeId: number
  createdAt: string
  updatedAt: string
}

export type AttributeFormType = {
  name: string
  slug: string
  type: AttributeType
  description: string | null
}

export type AttributeValueForm = {
  name: string
  slug: string
  colorCode: string | null
  buttonLabel: string | null
  attributeId: string
}
