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

  shortDescription: yup.string().optional().max(300, 'حداکثر 300 کاراکتر'),

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
    .max(200000000, 'حداکثر قیمت ۲۰۰ میلیون'),

  status: yup
    .mixed()
    .oneOf(['DRAFT', 'PUBLISHED', 'ARCHIVED'], 'وضعیت نامعتبر است') // مقدارهای enum را اینجا مشخص کن
    .required('وضعیت الزامی است'),

  type: yup
    .mixed()
    .oneOf(['PHYSICAL', 'DIGITAL'], 'نوع محصول نامعتبر است') // مقدارهای enum را اینجا هم مشخص کن
    .required('نوع محصول الزامی است'),

  mainImageId: yup.number().required('تصویر اصلی الزامی است').positive('عدد باید مثبت باشد'),

  galleryImageIds: yup
    .array()
    .of(yup.number().positive('شناسه تصویر باید عددی مثبت باشد'))
    .required('گالری تصاویر الزامی است')
    .min(1, 'حداقل یک تصویر لازم است')
    .test('unique', 'تصاویر تکراری هستند', value => {
      return Array.isArray(value) && new Set(value).size === value.length
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
    .of(yup.number().positive('شناسه ویژگی باید عددی مثبت باشد'))
    .required('ویژگی‌ها الزامی هستند')
    .test('unique', 'ویژگی‌ها تکراری هستند', value => {
      return Array.isArray(value) && new Set(value).size === value.length
    }),

  width: yup.number().positive().optional(),
  height: yup.number().positive().optional(),
  length: yup.number().positive().optional(),
  weight: yup.number().positive().optional()
})
