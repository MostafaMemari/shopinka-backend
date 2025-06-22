import { ProductStatus, ProductType } from '@/types/app/product.type'
import * as yup from 'yup'
import { seoSchema } from './seo.schema'

const productStatusValues = Object.values(ProductStatus)
const productTypeValues = Object.values(ProductType)

export const productSchema = yup.object().shape({
  name: yup.string().required('نام محصول الزامی است').max(100, 'حداکثر 100 کاراکتر').default(null),
  sku: yup.string().notRequired().max(30, 'حداکثر 30 کاراکتر').default(null),
  slug: yup
    .string()
    .notRequired()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(3, 'نامک باید حداقل 3 کاراکتر باشد')
    .default(null),

  description: yup.string().notRequired().default(null),
  shortDescription: yup.string().notRequired().max(300, 'حداکثر 300 کاراکتر').default(null),
  quantity: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),
  basePrice: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .min(1000, 'حداقل قیمت 1000')
    .max(200000000, 'حداکثر قیمت ۲۰۰ میلیون')
    .default(null),
  salePrice: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .min(1000, 'حداقل قیمت 1000')
    .max(200000000, 'حداکثر قیمت ۲۰۰ میلیون')
    .test('is-valid-sale-price', 'اگر قیمت فروش ویژه وارد شود، قیمت پایه الزامی است و باید بزرگتر باشد', function (salePrice) {
      const { basePrice } = this.parent

      if (salePrice === undefined || salePrice === null) return true

      if (basePrice === undefined) {
        return this.createError({
          message: 'اگر قیمت فروش ویژه وارد شود، قیمت پایه الزامی است',
          path: 'basePrice'
        })
      }

      if (salePrice >= basePrice) {
        return this.createError({
          message: 'قیمت فروش ویژه باید کمتر از قیمت پایه باشد',
          path: 'salePrice'
        })
      }

      return true
    })
    .default(null),

  status: yup.mixed<ProductStatus>().oneOf(productStatusValues, 'وضعیت نامعتبر است').notRequired().default(null),

  type: yup.mixed<ProductType>().oneOf(productTypeValues, 'نوع محصول نامعتبر است').required('نوع محصول الزامی است').default(null),

  mainImageId: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null),

  galleryImageIds: yup
    .array()
    .of(yup.number().defined().positive('شناسه تصویر باید عددی مثبت باشد'))
    .notRequired()
    .test('unique', 'تصاویر تکراری هستند', value => {
      if (!value) return true

      return new Set(value).size === value.length
    })
    .default(null),

  categoryIds: yup
    .array()
    .of(yup.number().defined().positive('شناسه دسته‌بندی باید عددی مثبت باشد'))
    .notRequired()
    .test('unique', 'دسته‌ها تکراری هستند', value => {
      return value ? new Set(value).size === value.length : true
    })
    .default(null),

  attributeIds: yup
    .array()
    .of(yup.number().defined().positive('شناسه ویژگی باید عددی مثبت باشد'))
    .notRequired()
    .test('unique', 'ویژگی‌ها تکراری هستند', value => {
      if (!value) return true

      return new Set(value).size === value.length
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

  width: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),
  height: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),
  length: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),
  weight: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  defaultVariantId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null)
})

export const productFormSchema = productSchema.concat(seoSchema)
