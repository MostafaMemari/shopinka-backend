'use client'

// React Imports
import { useMemo, useState, useCallback, useEffect } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'
import { useCategories } from '@/hooks/reactQuery/useCategory'
import { Category } from '@/types/app/category.type'
import { useFormContext } from 'react-hook-form'
import CreateCategoryModal from '@/views/pages/categories/CreateCategoryModal'

const ProductCategories = () => {
  const {
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext()

  const initialCategoryIds = getValues('categoryIds') || []

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategoryIds.map((id: number) => id.toString()))
  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, isLoading, isFetching, error } = useCategories({
    enabled: true,
    params: {
      take: 200,
      includeThumbnailImage: true,
      includeChildren: true,
      type: 'PRODUCT',
      childrenDepth: 6
    },
    staleTime: 5 * 60 * 1000
  })

  const categories: Category[] = useMemo(() => data?.data?.items || [], [data])

  useEffect(() => {
    const categoryIds = selectedCategories.map(id => parseInt(id, 10))

    setValue('categoryIds', categoryIds, { shouldValidate: true })
  }, [selectedCategories, setValue])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => (prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]))
  }

  const filterCategories = useCallback((categories: Category[], query: string): Category[] => {
    if (!query.trim()) return categories

    return categories
      .map(category => {
        const matches = category.name.toLowerCase().includes(query.toLowerCase().trim())
        const filteredChildren = filterCategories(category.children || [], query)

        if (matches) {
          return {
            ...category,
            children: filteredChildren
          }
        }

        return null
      })
      .filter((category): category is Category => category !== null)
  }, [])

  const filteredCategories = useMemo(() => filterCategories(categories, searchQuery), [categories, searchQuery, filterCategories])

  const RenderCategory = ({ category, depth = 0 }: { category: Category; depth?: number }) => {
    return (
      <Box sx={{ mb: 0.5 }}>
        <FormControlLabel
          sx={{ ml: depth * 4 }}
          control={<Checkbox checked={selectedCategories.includes(category.id.toString())} onChange={() => handleCategoryChange(category.id.toString())} />}
          label={<Typography fontWeight={500}>{category.name}</Typography>}
        />
        {category.children && category.children.length > 0 && (
          <Box sx={{ mt: 0.3 }}>
            {category.children.map(child => (
              <RenderCategory key={child.id} category={child} depth={depth + 1} />
            ))}
          </Box>
        )}
      </Box>
    )
  }

  return (
    <Card>
      <CardHeader title='دسته‌بندی' />
      <CardContent>
        <CustomTextField fullWidth label='جستجوی دسته‌بندی' placeholder='جستجو کنید...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} sx={{ mb: 4 }} />

        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            p: 2,
            border: theme => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme => theme.palette.grey[600],
              borderRadius: '4px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: theme => theme.palette.grey[800]
            }
          }}
        >
          {isLoading || isFetching ? (
            <Typography>در حال بارگذاری...</Typography>
          ) : error ? (
            <Typography color='error'>خطا در بارگذاری دسته‌بندی‌ها</Typography>
          ) : filteredCategories.length === 0 ? (
            <Typography>دسته‌بندی‌ای یافت نشد</Typography>
          ) : (
            filteredCategories.map(category => <RenderCategory key={category.id} category={category} />)
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 3 }}>
          <CreateCategoryModal>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              ثبت دسته بندی جدید
            </Typography>
          </CreateCategoryModal>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductCategories
