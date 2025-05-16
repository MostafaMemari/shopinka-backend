import { BlogStatus } from '@/types/app/blog.type'
import * as yup from 'yup'
import { seoSchema } from './seo.schema'

const blogStatusValues = Object.values(BlogStatus)

export const blogSchema = yup.object().shape({
  title: yup.string().required('نام محصول الزامی است').max(100, 'حداکثر 100 کاراکتر'),
  slug: yup
    .string()
    .required('نامک الزامی است')
    .max(120, 'حداکثر 120 کاراکتر')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'فرمت slug معتبر نیست'),
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
    .default(null)
})

export const blogFormSchema = blogSchema.concat(seoSchema)
