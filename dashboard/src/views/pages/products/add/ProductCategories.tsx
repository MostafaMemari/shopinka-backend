'use client'

// React Imports
import { useState } from 'react'

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

const ProductCategories = () => {
  // States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // لیست فرضی دسته‌بندی‌ها و زیر‌دسته‌ها
  const categories = [
    {
      id: 'household',
      name: 'خانگی',
      subcategories: [
        { id: 'kitchen', name: 'لوازم آشپزخانه' },
        { id: 'furniture', name: 'مبلمان' }
      ]
    },
    {
      id: 'electronics',
      name: 'الکترونیک',
      subcategories: [
        { id: 'mobile', name: 'گوشی موبایل' },
        { id: 'laptop', name: 'لپ‌تاپ' },
        { id: 'accessories', name: 'لوازم جانبی الکترونیک' }
      ]
    },
    {
      id: 'automotive',
      name: 'خودرو',
      subcategories: [
        { id: 'accessories', name: 'لوازم جانبی خودرو' },
        { id: 'tools', name: 'ابزار خودرو' }
      ]
    }
  ]

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev => (prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]))
  }

  return (
    <Card>
      <CardHeader title='دسته‌بندی' />
      <CardContent>
        <CustomTextField fullWidth label='جستجوی دسته‌بندی' placeholder='جستجو کنید...' sx={{ marginBottom: 4 }} />

        <form onSubmit={e => e.preventDefault()} className='flex flex-col gap-6'>
          <Box
            sx={{
              maxHeight: '300px',
              overflowY: 'auto',
              padding: 2,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                backgroundColor: '#555'
              }
            }}
          >
            {categories.map(category => (
              <Box key={category.id} sx={{ paddingLeft: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControlLabel
                  control={<Checkbox checked={selectedCategories.includes(category.id)} onChange={() => handleCategoryChange(category.id)} />}
                  label={<Typography className='font-medium'>{category.name}</Typography>}
                />
                {category.subcategories.length > 0 && (
                  <Box sx={{ paddingLeft: 4, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {category.subcategories.map(subcategory => (
                      <FormControlLabel
                        key={subcategory.id}
                        control={<Checkbox checked={selectedCategories.includes(subcategory.id)} onChange={() => handleCategoryChange(subcategory.id)} />}
                        label={subcategory.name}
                        sx={{ margin: 0 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </form>
      </CardContent>
    </Card>
  )
}

export default ProductCategories
