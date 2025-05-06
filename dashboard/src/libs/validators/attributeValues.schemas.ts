import { AttributeType } from '@/types/productAttributes'
import * as yup from 'yup'

export const createAttributeValueSchema = (attributeType: AttributeType) =>
  yup.object().shape({
    name: yup.string().required('نام ویژگی الزامی است').max(100, 'نام ویژگی نمی‌تواند بیشتر از 100 کاراکتر باشد'),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'نامک باید فقط شامل حروف کوچک، اعداد و خط تیره باشد',
        excludeEmptyString: true
      })
      .required('نامک الزامی است')
      .max(100, 'نامک نمی‌تواند بیشتر از 100 کاراکتر باشد'),
    colorCode: yup
      .string()
      .when('$attributeType', {
        is: (type: AttributeType) => type !== AttributeType.BUTTON,
        then: schema => schema.required('کد رنگ الزامی است').matches(/^#[0-9A-Fa-f]{6}$/, 'کد رنگ باید به فرمت هگزادسیمال باشد، مانند #FFFFFF'),
        otherwise: schema => schema.nullable().optional()
      })
      .max(100, 'کد رنگ نمی‌تواند بیشتر از 100 کاراکتر باشد'),
    buttonLabel: yup
      .string()
      .when('$attributeType', {
        is: AttributeType.BUTTON,
        then: schema => schema.required('برچسب دکمه الزامی است'),
        otherwise: schema => schema.nullable().optional()
      })
      .max(100, 'برچسب دکمه نمی‌تواند بیشتر از 100 کاراکتر باشد')
  })
