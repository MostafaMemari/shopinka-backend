export enum AttributeType {
  COLOR = 'color',
  BUTTON = 'button'
}

export type CreateAttributeFormValues = {
  name: string
  slug?: string | null
  type: AttributeType
  description?: string | null
}
