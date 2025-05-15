'use client'

import { useState, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import CustomTextField from '@core/components/mui/TextField'
import { HexColorPicker } from 'react-colorful'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Popper from '@mui/material/Popper'
import { AttributeType } from '@/types/app/productAttributes.type'

interface AttributeValueFormProps {
  control: any
  errors: any
  isLoading: boolean
  attributeType: AttributeType
}

const AttributeValueForm = ({ control, errors, isLoading, attributeType }: AttributeValueFormProps) => {
  const [colorAnchorEl, setColorAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenColorPicker = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setColorAnchorEl(event.currentTarget)
  }, [])

  const handleCloseColorPicker = useCallback(() => {
    setColorAnchorEl(null)
  }, [])

  const isColorPickerOpen = Boolean(colorAnchorEl)

  return (
    <form className='flex flex-col gap-5'>
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

                  if (value.length > 7) value = value.slice(0, 7)

                  if (!value) {
                    field.onChange(null)

                    return
                  }

                  if (!value.startsWith('#')) value = '#' + value
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
  )
}

export default AttributeValueForm
