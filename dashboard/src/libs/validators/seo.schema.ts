import { RobotsTag } from '@/types/enums/robotsTag'
import * as yup from 'yup'

const productRobotsValues = Object.values(RobotsTag)

export const seoSchema = yup.object({
  seo_title: yup.string().notRequired().default(null),
  seo_description: yup.string().notRequired().default(null),
  seo_keywords: yup
    .array()
    .of(
      yup
        .string()
        .required('کلمه کلیدی سئو نمی‌تواند خالی باشد')
        .test('non-empty', 'کلمه کلیدی سئو نمی‌تواند خالی باشد', value => value.trim().length > 0)
    )
    .notRequired()
    .default(null)
    .test('unique', 'کلمات کلیدی سئو باید یکتا باشند', value => {
      if (!value) return true

      return new Set(value).size === value.length
    }),
  seo_canonicalUrl: yup.string().notRequired().default(null),
  seo_ogTitle: yup.string().notRequired().default(null),
  seo_ogDescription: yup.string().notRequired().default(null),
  seo_ogImage: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null),
  seo_robotsTag: yup
    .string()
    .oneOf(productRobotsValues, 'دستور ربات‌های سئو باید یکی از مقادیر مجاز باشد')
    .required('دستور ربات‌های سئو الزامی است')
    .default(RobotsTag.INDEX_FOLLOW)
})
