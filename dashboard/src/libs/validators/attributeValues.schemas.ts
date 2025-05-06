import * as yup from 'yup'

export const createAttributeValueSchema = yup
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
    colorCode: yup
      .string()
      .max(7, 'کد رنگ نمی‌تواند بیشتر از 7 کاراکتر باشد')
      .matches(/^#[0-9A-Fa-f]{6}$/, 'کد رنگ باید به فرمت هگزادسیمال باشد، مانند #FFFFFF')
      .nullable()
      .optional(),
    buttonLabel: yup.string().max(100, 'برچسب دکمه نمی‌تواند بیشتر از 100 کاراکتر باشد').nullable().optional()
  })
  .required()
