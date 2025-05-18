'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Category } from '@/types/app/category.type'
import { CategoryForm } from '@/libs/validators/category.schema'
import { useCategories } from '@/hooks/reactQuery/useCategory'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'

interface ParentCategorySelectProps {
  control: Control<CategoryForm>
  errors: FieldErrors<CategoryForm>
  isLoading: boolean
}

const ParentCategorySelect = ({ control, errors, isLoading }: ParentCategorySelectProps) => {
  const { data, isLoading: isCategoriesLoading } = useCategories({
    enabled: true,
    params: {
      take: 200,
      includeChildren: true,
      childrenDepth: 6
    },
    staleTime: 5 * 60 * 1000
  })

  const categories: Category[] = data?.data?.items || []

  const findCategoryById = (categories: Category[], id: number): Category | undefined => {
    for (const category of categories) {
      if (category.id === id) return category

      if (category.children && category.children.length > 0) {
        const found = findCategoryById(category.children, id)

        if (found) return found
      }
    }

    return undefined
  }

  const renderCategoryRow = (category: Category, level: number = 0): JSX.Element => (
    <MenuItem key={category.id} value={category.id}>
      <Typography className='font-medium' color='text.primary' style={{ marginRight: `${level * 12}px` }}>
        {`${'-'.repeat(level)} ${category.name}`}
      </Typography>
    </MenuItem>
  )

  const renderCategories = (categories: Category[], level: number = 0): JSX.Element[] => {
    const rows: JSX.Element[] = []

    categories.forEach(category => {
      rows.push(renderCategoryRow(category, level))

      if (category.children && category.children.length > 0) {
        rows.push(...renderCategories(category.children, level + 1))
      }
    })

    return rows
  }

  return (
    <Controller
      name='parentId'
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors.parentId} disabled={isLoading || isCategoriesLoading}>
          <InputLabel id='parentId-label'>دسته‌بندی والد (اختیاری)</InputLabel>
          <Select
            {...field}
            labelId='parentId-label'
            label='دسته‌بندی والد (اختیاری)'
            value={field.value ?? ''}
            onChange={e => field.onChange(e.target.value ? Number(e.target.value) : null)}
            aria-describedby='parentId-error'
            renderValue={selected => {
              if (!selected) return 'هیچکدام'
              const selectedCategory = findCategoryById(categories, selected)

              return selectedCategory?.name || 'هیچکدام'
            }}
          >
            <MenuItem value=''>هیچکدام</MenuItem>
            {renderCategories(categories)}
          </Select>
          {errors.parentId && (
            <Typography variant='caption' color='error' id='parentId-error'>
              {errors.parentId.message}
            </Typography>
          )}
        </FormControl>
      )}
    />
  )
}

export default ParentCategorySelect
