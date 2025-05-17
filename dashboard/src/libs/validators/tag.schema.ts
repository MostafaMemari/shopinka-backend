import * as yup from 'yup'

export const tagSchema = yup
  .object({
    name: yup.string().required('نام الزامی است'),
    slug: yup
      .string()
      .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'نامک باید فقط شامل حروف کوچک، اعداد و خط تیره باشد',
        excludeEmptyString: true
      })
      .required('نامک الزامی است')
      .max(120, 'نامک نمی‌تواند بیشتر از 120 کاراکتر باشد'),

    thumbnailImageId: yup.number().positive().notRequired().default(null),

    description: yup.string().nullable().default(null)
  })
  .required()
