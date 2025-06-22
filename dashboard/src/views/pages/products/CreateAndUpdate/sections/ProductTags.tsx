'use client'

// React Imports
import { useMemo, useState, useEffect } from 'react'

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
import { useFormContext } from 'react-hook-form'
import CreateTagModal from '@/views/pages/tags/CreateTagModal'

const ProductTags = () => {
  const {
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()

  const initialTagIds = getValues('tagIds') || []
  const [selectedTags, setSelectedTags] = useState<number[]>(initialTagIds)

  const { data, isLoading, isFetching, error } = useTags({
    enabled: true,
    params: {
      take: 200,
      type: 'PRODUCT',
      includeThumbnailImage: true
    },
    staleTime: 5 * 60 * 1000
  })

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])

  useEffect(() => {
    setValue('tagIds', selectedTags, { shouldValidate: true })
  }, [selectedTags, setValue])

  return (
    <Card>
      <CardHeader title='برچسب‌ها' />
      <CardContent>
        <Autocomplete
          multiple
          freeSolo={false}
          options={tags}
          getOptionLabel={option => option.name}
          value={tags.filter(tag => selectedTags.includes(tag.id))}
          onChange={(_, newValue) => {
            const newSelectedTags = newValue.map(tag => tag.id)

            setSelectedTags(newSelectedTags)
          }}
          disabled={isLoading || isFetching}
          noOptionsText='برچسبی یافت نشد'
          renderInput={params => (
            <TextField {...params} label='انتخاب برچسب' placeholder='جستجو و انتخاب برچسب' error={!!errors.tagIds} helperText={errors.tagIds?.message?.toString()} />
          )}
        />

        {(isLoading || isFetching) && <Typography sx={{ mt: 2 }}>در حال بارگذاری...</Typography>}
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            خطا در بارگذاری برچسب‌ها
          </Typography>
        )}
        {!(isLoading || isFetching) && tags.length === 0 && <Typography sx={{ mt: 2 }}>برچسبی یافت نشد</Typography>}

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 3 }}>
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
