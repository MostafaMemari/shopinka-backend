import { BlogStatus } from '@/types/app/blog.type'
import * as yup from 'yup'
import { seoSchema } from './seo.schema'

const blogStatusValues = Object.values(BlogStatus)

export const blogSchema = yup.object().shape({
  title: yup.string().required('نام محصول الزامی است').max(100, 'حداکثر 100 کاراکتر'),
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
  content: yup.string().notRequired().default(null),
  readingTime: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  status: yup.mixed<BlogStatus>().oneOf(blogStatusValues, 'وضعیت نامعتبر است').notRequired().default(null),

  mainImageId: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null),

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
    .of(yup.number().defined().positive('شناسه برچسب باید عددی مثبت باشد'))
    .notRequired()
    .test('unique', 'دسته‌ها تکراری هستند', value => {
      return value ? new Set(value).size === value.length : true
    })
    .default(null)
})

export const blogFormSchema = blogSchema.concat(seoSchema)
