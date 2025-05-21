import * as yup from 'yup'
import { seoSchema } from './seo.schema'

export const tagSchema = yup
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

    thumbnailImageId: yup.number().positive().notRequired().default(null),

    description: yup.string().nullable().default(null)
  })
  .required()

export const tagFormSchema = tagSchema.concat(seoSchema)
