import * as yup from 'yup'
import { seoSchema } from './seo.schema'
import { CategoryType } from '@/types/app/category.type'

export const categorySchema = yup
  .object({
    name: yup.string().required('نام الزامی است'),
    slug: yup
      .string()
      .notRequired()
      .transform((value, originalValue) => (originalValue === '' ? null : value))
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'نامک باید فقط شامل حروف کوچک، اعداد و خط تیره باشد',
        excludeEmptyString: true
      })
      .min(3, 'نامک باید حداقل 3 کاراکتر باشد')
      .max(50, 'نامک نمی‌تواند بیشتر از 50 کاراکتر باشد')
      .default(null),

    type: yup
      .string()
      .oneOf(Object.values(CategoryType), 'نوع دسته‌بندی باید یکی از گزینه‌های مجاز باشد')
      .required('انتخاب نوع دسته‌بندی الزامی است')
      .default(CategoryType.PRODUCT),

    parentId: yup.number().notRequired().positive().default(null),

    thumbnailImageId: yup.number().positive().notRequired().default(null),

    description: yup.string().nullable().default(null)
  })
  .required()

export const categoryFormSchema = categorySchema.concat(seoSchema)

export type CategoryForm = yup.InferType<typeof categoryFormSchema>
