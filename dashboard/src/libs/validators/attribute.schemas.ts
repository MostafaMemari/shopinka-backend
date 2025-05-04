import * as yup from 'yup'
import { AttributeType } from '@/types/attributes'

export const createAttributeSchema = yup
  .object({
    name: yup.string().required('نام الزامی است').min(3, 'نام باید حداقل 3 کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'نامک باید فقط شامل حروف کوچک، اعداد و خط تیره باشد',
        excludeEmptyString: true
      })
      .min(3, 'نامک باید حداقل 3 کاراکتر باشد')
      .max(50, 'نامک نمی‌تواند بیشتر از 50 کاراکتر باشد')
      .nullable()
      .optional(),
    type: yup.string().oneOf(Object.values(AttributeType), 'نوع ویژگی نامعتبر است').required('نوع ویژگی الزامی است'),
    description: yup.string().min(5, 'توضیحات باید حداقل 5 کاراکتر باشد').max(200, 'توضیحات نمی‌تواند بیشتر از 200 کاراکتر باشد').nullable().optional()
  })
  .required()
