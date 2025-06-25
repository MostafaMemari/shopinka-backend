import { AttributeType } from '@/types/app/productAttributes.type'
import * as yup from 'yup'

export const AttributeValueSchema = yup.object({
  name: yup.string().required('نام ویژگی الزامی است').max(100, 'نام ویژگی نمی‌تواند بیشتر از 100 کاراکتر باشد'),
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

  colorCode: yup
    .string()
    .nullable()
    .default(null)
    .when('$type', {
      is: AttributeType.COLOR,
      then: schema => schema.required('کد رنگ الزامی است'),
      otherwise: schema => schema.optional().nullable().default(null)
    }),

  buttonLabel: yup
    .string()
    .nullable()
    .default(null)
    .when('$type', {
      is: AttributeType.BUTTON,
      then: schema => schema.required('برچسب دکمه الزامی است'),
      otherwise: schema => schema.optional().nullable().default(null)
    }),

  attributeId: yup.string().required('شناسه ویژگی الزامی است')
})
