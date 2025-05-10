import * as yup from 'yup'

export const productSchema = yup.object().shape({
  sku: yup.string().required('کد محصول الزامی است').max(30, 'حداکثر 30 کاراکتر'),

  name: yup.string().required('نام محصول الزامی است').max(100, 'حداکثر 100 کاراکتر'),

  slug: yup
    .string()
    .optional()
    .max(120, 'حداکثر 120 کاراکتر')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'فرمت slug معتبر نیست'),

  description: yup.string().optional(),

  shortDescription: yup
    .string()
    .transform(value => (value === '' ? undefined : value))
    .optional()
    .max(300, 'حداکثر 300 کاراکتر'),

  quantity: yup.number().optional().positive('باید عددی مثبت باشد'),

  basePrice: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .optional()
    .positive('باید عددی مثبت باشد')
    .min(1000, 'حداقل قیمت 1000')
    .max(200000000, 'حداکثر قیمت ۲۰۰ میلیون'),

  salePrice: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? undefined : value))
    .optional()
    .positive('باید عددی مثبت باشد')
    .min(1000, 'حداقل قیمت 1000')
    .max(200000000, 'حداکثر قیمت ۲۰۰ میلیون')
    .test('is-less-than-base', 'قیمت فروش باید کمتر از قیمت پایه باشد', function (value) {
      const { basePrice } = this.parent

      if (value !== undefined && basePrice !== undefined) {
        return value < basePrice
      }

      return true
    }),

  status: yup.mixed().oneOf(['DRAFT', 'PUBLISHED'], 'وضعیت نامعتبر است').optional(),

  type: yup.mixed().oneOf(['SIMPLE', 'VARIABLE'], 'نوع محصول نامعتبر است').optional(),

  mainImageId: yup.number().optional().positive('عدد باید مثبت باشد'),

  galleryImageIds: yup
    .array()
    .optional()
    .of(yup.number().positive('شناسه تصویر باید عددی مثبت باشد'))
    .min(1, 'حداقل یک تصویر لازم است')
    .test('unique', 'تصاویر تکراری هستند', value => {
      if (!value) return true

      return new Set(value).size === value.length
    }),
  categoryIds: yup
    .array()
    .of(yup.number().positive('شناسه دسته‌بندی باید عددی مثبت باشد'))
    .optional()
    .test('unique', 'دسته‌ها تکراری هستند', value => {
      return value ? new Set(value).size === value.length : true
    }),

  attributeIds: yup
    .array()
    .optional()
    .of(yup.number().positive('شناسه ویژگی باید عددی مثبت باشد'))
    .test('unique', 'ویژگی‌ها تکراری هستند', value => {
      if (!value) return true

      return new Set(value).size === value.length
    }),

  width: yup.number().positive().optional(),
  height: yup.number().positive().optional(),
  length: yup.number().positive().optional(),
  weight: yup.number().positive().optional()
})
