import * as yup from 'yup'

export const shippingInfoSchema = yup.object({
  orderId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  trackingCode: yup.string().notRequired().min(3, 'حداقل 3 کاراکتر').max(35, 'حداکثر 30 کاراکتر').default(null)
})
