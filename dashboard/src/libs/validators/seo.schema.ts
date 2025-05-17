import { RobotsTag } from '@/types/enums/robotsTag'
import * as yup from 'yup'

const productRobotsValues = Object.values(RobotsTag)

export const seoSchema = yup.object({
  seo_title: yup.string().notRequired().default(''),
  seo_description: yup.string().notRequired().default(''),
  seo_keywords: yup
    .array()
    .of(
      yup
        .string()
        .required('کلمه کلیدی سئو نمی‌تواند خالی باشد')
        .test('non-empty', 'کلمه کلیدی سئو نمی‌تواند خالی باشد', value => value.trim().length > 0)
    )
    .notRequired()
    .default([]),
  seo_canonicalUrl: yup.string().notRequired().default(''),
  seo_ogTitle: yup.string().notRequired().default(''),
  seo_ogDescription: yup.string().notRequired().default(''),
  seo_ogImage: yup.string().notRequired().default(''),
  seo_robotsTag: yup
    .string()
    .oneOf(productRobotsValues, 'دستور ربات‌های سئو باید یکی از مقادیر مجاز باشد')
    .required('دستور ربات‌های سئو الزامی است')
    .default(RobotsTag.INDEX_FOLLOW)
})
