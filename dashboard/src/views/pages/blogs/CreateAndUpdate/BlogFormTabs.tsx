'use client'

import { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import BlogInformation from '@/views/pages/blogs/CreateAndUpdate/sections/BlogInformation'
import BlogMainImage from '@/views/pages/blogs/CreateAndUpdate/sections/BlogMainImage'
import BlogCategories from '@/views/pages/blogs/CreateAndUpdate/sections/BlogCategories'
import SeoTabContent from '@/views/pages/blogs/CreateAndUpdate/SeoTabContent'
import BlogTags from './sections/BlogTags'

const BlogFormTabs = () => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label='product form tabs'>
          <Tab label='اطلاعات اصلی' id='tab-0' aria-controls='tabpanel-0' />
          <Tab label='سئو' id='tab-1' aria-controls='tabpanel-1' />
        </Tabs>
      </Box>
      <Grid container spacing={6}>
        {tabValue === 0 && (
          <>
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <BlogInformation />
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container spacing={6}>
                <Grid size={{ xs: 12 }}>
                  <BlogMainImage />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <BlogCategories />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <BlogTags />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {tabValue === 1 && (
          <Grid size={{ xs: 12, md: 8 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12 }}>
                <SeoTabContent />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  )
}

export default BlogFormTabs
