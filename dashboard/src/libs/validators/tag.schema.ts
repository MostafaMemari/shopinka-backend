import * as yup from 'yup'
import { seoSchema } from './seo.schema'
import { TagType } from '@/types/app/tag.type'

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

    type: yup.string().oneOf(Object.values(TagType), 'نوع برچسب باید یکی از گزینه‌های مجاز باشد').required('انتخاب نوع برچسب الزامی است').default(TagType.PRODUCT),

    thumbnailImageId: yup.number().positive().notRequired().default(null),

    categoryIds: yup
      .array()
      .of(yup.number().defined().positive('شناسه دسته‌بندی باید عددی مثبت باشد'))
      .notRequired()
      .test('unique', 'دسته‌ها تکراری هستند', value => {
        return value ? new Set(value).size === value.length : true
      })
      .default(null),

    tagIds: yup
      .array()
      .of(yup.number().defined().positive('شناسه تگ باید عددی مثبت باشد'))
      .notRequired()
      .test('unique', 'تگ‌ها تکراری هستند', value => {
        if (!value) return true

        return new Set(value).size === value.length
      })
      .default(null),

    description: yup.string().nullable().default(null)
  })
  .required()

export const tagFormSchema = tagSchema.concat(seoSchema)
