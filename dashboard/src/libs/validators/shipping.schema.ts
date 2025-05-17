import * as yup from 'yup'

export const shippingSchema = yup.object({
  name: yup.string().required('نام الزامی است'),

  price: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  estimatedDays: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  isActive: yup.boolean().default(true)
})
