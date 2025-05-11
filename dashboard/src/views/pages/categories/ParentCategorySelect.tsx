'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { Category, CategoryForm } from '@/types/category'
import { useCategories } from '@/hooks/reactQuery/useCategory'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'

interface ParentCategorySelectProps {
  control: Control<CategoryForm>
  errors: FieldErrors<CategoryForm>
  isLoading: boolean
}

interface CategoryNode extends Category {
  children: CategoryNode[]
}

const buildCategoryTree = (categories: Category[]): CategoryNode[] => {
  const map = new Map<number, CategoryNode>()
  const roots: CategoryNode[] = []

  categories.forEach(cat => {
    map.set(cat.id, { ...cat, children: [] })
  })

  map.forEach(cat => {
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children.push(cat)
    } else {
      roots.push(cat)
    }
  })

  return roots
}

const renderCategoryOptions = (nodes: CategoryNode[], level = 0): JSX.Element[] => {
  return nodes.flatMap(node => {
    const indent = level === 0 ? '' : 'ࡋ '.padStart(level * 3 + 2, ' ')

    const marginRight = level >= 1 ? level * 10 : 0

    const current = (
      <MenuItem key={node.id} value={node.id} style={{ marginRight: `${marginRight}px` }}>
        {indent + node.name}
      </MenuItem>
    )

    const children = renderCategoryOptions(node.children, level + 1)

    return [current, ...children]
  })
}

const ParentCategorySelect = ({ control, errors, isLoading }: ParentCategorySelectProps) => {
  const { data, isLoading: isCategoriesLoading } = useCategories({
    enabled: true,
    staleTime: 5 * 60 * 1000
  })

  const categories: Category[] = data?.data?.items || []
  const categoryTree = buildCategoryTree(categories)

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
              const selectedCategory = categories.find(cat => cat.id === selected)

              return selectedCategory?.name || ''
            }}
          >
            <MenuItem value=''>هیچکدام</MenuItem>
            {renderCategoryOptions(categoryTree)}
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
