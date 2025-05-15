import { useState, useCallback, ReactNode } from 'react'
import CustomTextField from '@core/components/mui/TextField'
import CustomDialog from '@/@core/components/mui/CustomDialog'
import { Controller, useForm } from 'react-hook-form'
import { Typography } from '@mui/material'
import { AttributeType, AttributeValueForm } from '@/types/app/productAttributes'
import { yupResolver } from '@hookform/resolvers/yup'
import { updateAttributeValues } from '@/libs/api/productAttributeValues.api'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorAttributeMessage } from '@/messages/auth/attributeMessages'
import getChangedFields from '@/utils/getChangedFields'
import { AttributeValueSchema } from '@/libs/validators/attributeValues.schema'
import { HexColorPicker } from 'react-colorful'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'
import FormActions from '@/components/FormActions'
import { QueryKeys } from '@/types/enums/query-keys'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { cleanObject } from '@/utils/formatters'

interface UpdateAttributeValuesModalProps {
  attributeType: AttributeType
  initialData: Partial<AttributeValueForm & { id: string }>
  children?: ReactNode
}

const UpdateAttributeValuesModal = ({ attributeType, initialData, children }: UpdateAttributeValuesModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
    setColorAnchorEl(event.currentTarget)
  }

  const handleCloseColorPicker = () => {
    setColorAnchorEl(null)
  }

  const isColorPickerOpen = Boolean(colorAnchorEl)

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<AttributeValueForm>({
    defaultValues: {
      name: initialData?.name ?? '',
      slug: initialData?.slug ?? '',
      colorCode: initialData?.colorCode ?? '',
      buttonLabel: initialData?.buttonLabel ?? '',
      attributeId: initialData?.attributeId ?? ''
    },

    resolver: yupResolver(AttributeValueSchema(attributeType))
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: AttributeValueForm) => {
      setIsLoading(true)

      try {
        if (initialData?.id !== undefined) {
          const cleanedData = cleanObject(formData)
          const changedData = getChangedFields(initialData, cleanedData)

          if (Object.keys(changedData).length === 0) {
            showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })

            return
          }

          const { status } = await updateAttributeValues(String(initialData.id), changedData)

          const errorMessage = handleApiError(status, errorAttributeMessage)

          if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })

            return
          }

          if (status === 200) {
            showToast({ type: 'success', message: 'ویژگی با موفقیت بروزرسانی شد' })
            invalidate(QueryKeys.Attributes)
            handleClose()
          }
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطایی در به‌روزرسانی متغییر رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, initialData, invalidate]
  )

  return (
    <div>
      <div onClick={handleOpen}>{children || <Typography className='cursor-pointer'>{initialData.name}</Typography>}</div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`بروزرسانی ${initialData.name}`}
        defaultMaxWidth='xs'
        actions={
          <>
            <FormActions onCancel={handleClose} submitText='بروزرسانی' onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <Controller
            name='name'
            control={control}
            disabled={isLoading}
            render={({ field }) => (
              <CustomTextField {...field} fullWidth label='نام ویژگی' placeholder='لطفا نام ویژگی را وارد کنید' error={!!errors.name} helperText={errors.name?.message} />
            )}
          />
          <Controller
            name='slug'
            control={control}
            disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
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

export default UpdateAttributeValuesModal
