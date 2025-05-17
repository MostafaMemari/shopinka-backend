import * as yup from 'yup'
import { seoSchema } from './seo.schema'

export const productVariantSchema = yup.object().shape({
  sku: yup.string().required('کد محصول الزامی است').max(30, 'حداکثر 30 کاراکتر'),
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

  mainImageId: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null),

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
    .default(null)
})

attributeValuesIds: yup.array().of(yup.array().of(yup.number()).min(1, 'هر ترکیب باید حداقل یک مقدار داشته باشد')).notRequired().default(null)

export const productFormSchema = productVariantSchema.concat(seoSchema)

// attributeValuesIds: yup
//   .array()
//   .of(yup.array().of(yup.number().positive('شناسه ویژگی باید عددی مثبت باشد')).min(1, 'هر ترکیب باید حداقل یک مقدار داشته باشد'))
//   .notRequired(),
