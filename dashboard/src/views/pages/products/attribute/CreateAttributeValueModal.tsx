import { useState } from 'react'
import Button from '@mui/material/Button'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { AttributeType } from '@/types/productAttributes'
import { yupResolver } from '@hookform/resolvers/yup'
import { createAttribute } from '@/libs/api/productAttributes'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorAttributeMessage } from '@/messages/auth/attributeMessages'
import { useRouter } from 'next/navigation'
import { createAttributeValueSchema } from '@/libs/validators/attributeValues.schemas'
import { HexColorPicker } from 'react-colorful'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'
import { createAttributeValues } from '@/libs/api/productAttributeValues'

const CreateAttributeValueModal = ({ attributeName, attributeId, attributeType }: { attributeName: string; attributeId: number; attributeType: AttributeType }) => {
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
    setColorAnchorEl(event.currentTarget)
  }

  const handleCloseColorPicker = () => {
    setColorAnchorEl(null)
  }

  const isColorPickerOpen = Boolean(colorAnchorEl)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(createAttributeValueSchema),
    defaultValues: {
      name: '',
      slug: null as string | null,
      colorCode: '',
      buttonLabel: ''
    }
  })

  const onSubmit = async (formData: any) => {
    try {
      const res = await createAttributeValues({
        name: formData.name,
        slug: formData.slug || null,
        colorCode: formData.colorCode || null,
        buttonLabel: formData.buttonLabel || null,
        attributeId: String(attributeId)
      })

      const errorMessage = handleApiError(res.status, errorAttributeMessage)

      if (errorMessage) return showToast({ type: 'error', message: errorMessage })

      if (res.status === 201) {
        showToast({ type: 'success', message: 'ویژگی با موفقیت ثبت شد' })
        router.push('/products/attributes')
      }

      reset()
      handleClose()
    } catch (error: any) {
      showToast({ type: 'error', message: 'خطای سیستمی' })
    }
  }

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        sx={{
          direction: 'rtl',
          margin: '4px',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <i className='tabler-plus' style={{ fontSize: '24px' }} />
      </IconButton>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`ثبت مقدار ویژگی برای ${attributeName}`}
        defaultMaxWidth='xs'
        actions={
          <>
            <Button onClick={handleClose} color='secondary'>
              انصراف
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant='contained'>
              ثبت
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name='slug'
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                value={field.value ?? ''}
                fullWidth
                label='نامک'
                placeholder='لطفا نامک ویژگی را وارد کنید'
                error={!!errors.slug}
                helperText={errors.slug?.message}
                onChange={e => field.onChange(e.target.value || null)}
              />
            )}
          />
          {attributeType === AttributeType.BUTTON ? (
            <Controller
              name='buttonLabel'
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  value={field.value ?? ''}
                  fullWidth
                  label='دکمه'
                  placeholder='لطفا نام دکمه را وارد کنید'
                  error={!!errors.buttonLabel}
                  helperText={errors.buttonLabel?.message}
                  onChange={e => field.onChange(e.target.value || null)}
                />
              )}
            />
          ) : (
            <Controller
              name='colorCode'
              control={control}
              render={({ field }) => (
                <div className='flex items-center gap-2 relative'>
                  <CustomTextField
                    {...field}
                    value={field.value ?? ''}
                    fullWidth
                    label='انتخاب رنگ'
                    placeholder='#FFFFFF'
                    error={!!errors.colorCode}
                    helperText={errors.colorCode?.message}
                    onChange={e => {
                      let value = e.target.value

                      if (value.length > 7) {
                        value = value.slice(0, 7)
                      }

                      if (!value) {
                        field.onChange(null)

                        return
                      }

                      if (!value.startsWith('#')) {
                        value = '#' + value
                      }

                      value = value.replace(/[^#0-9A-Fa-f]/g, '').slice(0, 7)
                      field.onChange(value)
                    }}
                  />
                  <div
                    onClick={handleOpenColorPicker}
                    style={{
                      width: 32,
                      height: 32,
                      marginTop: 16,
                      borderRadius: 6,
                      cursor: 'pointer',
                      backgroundColor: field.value || '#eee',
                      border: '1px solid #ccc',
                      flexShrink: 0
                    }}
                    title='انتخاب رنگ'
                  />
                  <Popper
                    open={isColorPickerOpen}
                    anchorEl={colorAnchorEl}
                    placement='top-start'
                    modifiers={[
                      { name: 'offset', options: { offset: [0, 8] } },
                      { name: 'preventOverflow', options: { boundariesElement: 'viewport' } }
                    ]}
                    style={{ zIndex: 1300 }}
                  >
                    <ClickAwayListener onClickAway={handleCloseColorPicker}>
                      <div
                        style={{
                          padding: 8,
                          background: '#fff',
                          borderRadius: 8,
                          boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
                          border: '1px solid #e0e0e0'
                        }}
                      >
                        <HexColorPicker color={field.value || '#000000'} onChange={(color: string) => field.onChange(color)} style={{ width: 200, height: 150 }} />
                      </div>
                    </ClickAwayListener>
                  </Popper>
                </div>
              )}
            />
          )}
        </form>
      </CustomDialog>
    </div>
  )
}

export default CreateAttributeValueModal
