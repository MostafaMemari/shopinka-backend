'use client'

// React Imports
import { useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import { useTags } from '@/hooks/reactQuery/useTag'
import { Tag } from '@/types/app/tag.type'
import { Controller, useFormContext } from 'react-hook-form'
import CreateTagModal from '@/views/pages/tags/CreateTagModal'

const ProductTags = () => {
  const {
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()

  const initialTagIds = getValues('tagIds') || []

  const [inputValue, setInputValue] = useState('')

  const { data, isLoading, isFetching, error } = useTags({
    enabled: true,
    params: {
      take: 200,
      includeThumbnailImage: true
    },
    staleTime: 5 * 60 * 1000
  })

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])

  const tagOptions = useMemo(() => tags.map(tag => tag.name), [tags])

  return (
    <Card>
      <CardHeader title='برچسب‌ها' />
      <CardContent>
        <Controller
          name='tagIds'
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              freeSolo={false}
              options={tagOptions}
              value={field.value ? field.value.map((id: number) => tags.find(tag => tag.id === id)?.name || '') : []}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue)
              }}
              onChange={(_, newValue) => {
                const uniqueValues = Array.from(new Set(newValue.map(v => v.trim()).filter(v => v)))

                const selectedTagIds = uniqueValues
                  .map(name => {
                    const tag = tags.find(tag => tag.name === name)

                    return tag ? tag.id : null
                  })
                  .filter((id): id is number => id !== null)

                setValue('tagIds', selectedTagIds, { shouldValidate: true })
                field.onChange(selectedTagIds)
              }}
              disabled={isLoading || isFetching}
              renderInput={params => (
                <TextField
                  {...params}
                  label='برچسب‌ها'
                  placeholder='برچسب را انتخاب کنید یا جدید اضافه کنید'
                  error={!!errors.tagIds}
                  helperText={errors.tagIds?.message?.toString()}
                  disabled={isLoading || isFetching}
                  onKeyDown={e => {
                    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
                      e.preventDefault()
                      const newTag = inputValue.trim()

                      const existingTag = tags.find(tag => tag.name === newTag)
                      const currentValues = Array.isArray(field.value) ? field.value : []

                      if (existingTag && !currentValues.includes(existingTag.id)) {
                        const updated = [...currentValues, existingTag.id]

                        setValue('tagIds', updated, { shouldValidate: true })
                        field.onChange(updated)
                        setInputValue('')
                      }
                    }
                  }}
                />
              )}
            />
          )}
        />

        {(isLoading || isFetching) && <Typography sx={{ mt: 2 }}>در حال بارگذاری...</Typography>}
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            خطا در بارگذاری برچسب‌ها
          </Typography>
        )}
        {!(isLoading || isFetching) && tags.length === 0 && <Typography sx={{ mt: 2 }}>برچسبی یافت نشد</Typography>}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: 3
          }}
        >
          <CreateTagModal>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              ثبت برچسب جدید
            </Typography>
          </CreateTagModal>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductTags
