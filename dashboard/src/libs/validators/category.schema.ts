import * as yup from 'yup'
import { seoSchema } from './seo.schema'

// title: yup.string().required('نام الزامی است').min(3, 'نام باید حداقل 3 کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'),
export const categorySchema = yup
  .object({
    name: yup.string().required('نام الزامی است'),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'نامک باید فقط شامل حروف کوچک، اعداد و خط تیره باشد',
        excludeEmptyString: true
      })
      .required('نامک الزامی است')
      .max(120, 'نامک نمی‌تواند بیشتر از 120 کاراکتر باشد'),

    parentId: yup.number().notRequired().positive().default(null),

    thumbnailImageId: yup.number().positive().notRequired().default(null),

    description: yup.string().nullable().default(null)
  })
  .required()

export const categoryFormSchema = categorySchema.concat(seoSchema)

export type CategoryForm = yup.InferType<typeof categoryFormSchema>
